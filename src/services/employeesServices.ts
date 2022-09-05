import * as cardRepository from '../repositories/cardRepository';
import * as paymentRepository from '../repositories/paymentRepository';
import * as rechargeRepository from '../repositories/rechargeRepository';
import * as businessRepository from '../repositories/businessRepository';
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
        throw 'Card is expired!'
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

export async function blockCard( id: number, yourPassword: string) {
    const isCardRegistered = await cardRepository.findById(id) 
    if(!isCardRegistered) {
        throw 'Card must be registered to be activated.'
        }

    const isExpired: boolean = Number(dayjs().format('MM/YY').split('/')[1]) > Number(isCardRegistered.expirationDate.split('/')[1]) || Number(dayjs().format('MM/YY').split('/')[0]) > Number(isCardRegistered.expirationDate.split('/')[0]) && Number(dayjs().format('MM/YY').split('/')[1]) === Number(isCardRegistered.expirationDate.split('/')[1]);  
    if(isExpired) {
        throw 'Card is expired!'
        }

    if(isCardRegistered.password) {
        const isPasswordValid: boolean = cryptr.decrypt(isCardRegistered.password) === yourPassword;
        if(!isPasswordValid) {
            throw 'The security code is incorrect!'
            } 
    } else {
        throw 'This card is not active! Activate it before trying to block it.'
    }

    if(isCardRegistered.isBlocked) {
        throw 'Card must be unblocked to be blocked!'
        }

    const cardData = { isBlocked: true }

    cardRepository.update(id, cardData)
}

export async function unblockCard( id: number, yourPassword: string) {
    const isCardRegistered = await cardRepository.findById(id) 
    if(!isCardRegistered) {
        throw 'Card must be registered to be activated.'
        }

    const isExpired: boolean = Number(dayjs().format('MM/YY').split('/')[1]) > Number(isCardRegistered.expirationDate.split('/')[1]) || Number(dayjs().format('MM/YY').split('/')[0]) > Number(isCardRegistered.expirationDate.split('/')[0]) && Number(dayjs().format('MM/YY').split('/')[1]) === Number(isCardRegistered.expirationDate.split('/')[1]);  
    if(isExpired) {
        throw 'Card is expired!'
        }

    if(isCardRegistered.password) {
        const isPasswordValid: boolean = cryptr.decrypt(isCardRegistered.password) === yourPassword;
        if(!isPasswordValid) {
            throw 'The security code is incorrect!'
            } 
    } else {
        throw 'This card is not active! Activate it before trying to block it.'
    }

    if(!isCardRegistered.isBlocked) {
        throw 'Card must be unblocked to be blocked!'
        }

    const cardData = { isBlocked: false }

    cardRepository.update(id, cardData)
}

export async function purchaseWithCard( cardId: number, yourPassword: string, businessId: number, amount: number) {
    const isCardRegistered = await cardRepository.findById(cardId) 
    if(!isCardRegistered) {
        throw 'Card must be registered to purchase.'
        }

     if(isCardRegistered.isBlocked) {
        throw 'Card must be active to purchase. Unblock the card to enable recharge.'
        }

    const isExpired: boolean = Number(dayjs().format('MM/YY').split('/')[1]) > Number(isCardRegistered.expirationDate.split('/')[1]) || Number(dayjs().format('MM/YY').split('/')[0]) > Number(isCardRegistered.expirationDate.split('/')[0]) && Number(dayjs().format('MM/YY').split('/')[1]) === Number(isCardRegistered.expirationDate.split('/')[1]);  
    if(isExpired) {
        throw 'Card is expired!'
        }

    if(isCardRegistered.password) {
        const isPasswordValid: boolean = cryptr.decrypt(isCardRegistered.password) === yourPassword;
        if(!isPasswordValid) {
            throw 'The security code is incorrect!'
            } 
    } else {
            throw 'This card is not active! Activate it before trying to purchase with it.'
        }

    const isBusinessRegistered = await businessRepository.findById(businessId);
    if(!isBusinessRegistered) {
        throw 'This business is not registered!'
    }

    if(isBusinessRegistered.type !== isCardRegistered.type) {
        throw 'Not possible to purchase in this shop! Your card type is not compatible to this business.'
    }

    const purchases = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);
   
    const spent = purchases.reduce(function(prev, cur) {
        return prev + cur.amount;
      }, 0);
    const earned = recharges.reduce(function(prev, cur) {
        return prev + cur.amount;
      }, 0);

    const balance = earned-spent;

    if(amount > balance) {
        throw 'Insufficient balance to perform this purchase.'
    }
    
    const paymentData = { cardId, businessId, amount };
    
    paymentRepository.insert(paymentData);
}