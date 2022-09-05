import * as employeeRepository from '../repositories/employeeRepository';
import * as cardRepository from '../repositories/cardRepository';
import * as paymentRepository from '../repositories/paymentRepository';
import * as rechargeRepository from '../repositories/rechargeRepository';
import Cryptr from 'cryptr';
import dayjs from 'dayjs';

const cryptr = new Cryptr('myTotallySecretKey');

export async function activateCard( id: number, securityCode: string, yourPassword: string) {
    const isCardRegistered = await cardRepository.findById(id) 
    if(!isCardRegistered) {
        throw 'Card must be registered to be activated.'
        }

     if(isCardRegistered.isBlocked) {
        throw 'Card must be active to be recharged. Unblock the card to enable recharge.'
        }

    const isExpired: boolean = Number(dayjs().format('MM/YY').split('/')[1]) > Number(isCardRegistered.expirationDate.split('/')[1]) || Number(dayjs().format('MM/YY').split('/')[0]) > Number(isCardRegistered.expirationDate.split('/')[0]) && Number(dayjs().format('MM/YY').split('/')[1]) === Number(isCardRegistered.expirationDate.split('/')[1]);  
    if(isExpired) {
        throw 'Card is expired! Create another card for your employee and recharge it.'
        }

    const isSecurityCodeValid: boolean = cryptr.decrypt(isCardRegistered.securityCode).toString() === securityCode;
    if(!isSecurityCodeValid) {
        throw 'The security code is incorrect!'
        }

    const cardData = { password: cryptr.encrypt(yourPassword) }

    cardRepository.update(id, cardData);
} 

export async function checkCardBalance( id: number ) {
    const isCardRegistered = await cardRepository.findById(id) 
    if(!isCardRegistered) {
        throw 'Card must be registered to be activated.'
        }

    const cardId = id;
    const purchases = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);
   
    const spent = purchases.reduce(function(prev, cur) {
        return prev + cur.amount;
      }, 0);
    const earned = recharges.reduce(function(prev, cur) {
        return prev + cur.amount;
      }, 0);

    return {
        balance: earned-spent,
        transactions: purchases,
        recharges: recharges
    }
    
}