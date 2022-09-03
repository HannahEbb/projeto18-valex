import { findByApiKey } from '../repositories/companyRepository';
import * as employeeRepository from '../repositories/employeeRepository';
import * as cardRepository from '../repositories/cardRepository';
import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import dayjs from 'dayjs';


const cryptr = new Cryptr('myTotallySecretKey'); //para criptografar o CVV do cartao antes de inserir no banco

export async function createCard( apiKey: string, data: {id: number, cardType: cardRepository.TransactionTypes}) {
    const isCompanyValid = await findByApiKey(apiKey)  //confirma no banco se essa chave é válida
    if(!isCompanyValid) {
        throw 'Company not registered' // manda para o middleware que trata o erro? Ainda não, senão vai ter q tipar o erro (assunto da proxima semana)
    }

    const  { id, cardType } = data
    
    const isEmployeeRegistered = await employeeRepository.findById(id) // se esse empregado estiver cadastrado, todos os dados dele já estão no banco
    if(!isEmployeeRegistered) {
        throw 'Employee not registered' 
    }

    // const type: cardRepository.TransactionTypes = cardType;
    // const employeeId: number = id;
    // const isThereACardThisType = await cardRepository.findByTypeAndEmployeeId(type, employeeId ) //employees nao podem ter mais de um cartao do mesmo tipo
    // if(isThereACardThisType) {
    //     throw 'Each employee is allowed only one card of each type'
    // }

    const fullName: string = isEmployeeRegistered.fullName;
    const [first, ...rest] = fullName.split(" ");
    const last = rest.pop();
    const employeeCardName: string = [first, ...rest.map(n => n[0] + "."), last].join(" ");

    const cardNumber: string = faker.finance.creditCardNumber();
    const cardSecurityCode: string = cryptr.encrypt(faker.finance.creditCardCVV());
    const cardExpirationDate: string = dayjs().add(5, 'year').format('MM/YY');
   
    
      const cardData: cardRepository.CardInsertData = {
          employeeId: id,
          number: cardNumber,
          cardholderName: employeeCardName.toUpperCase(),
          securityCode: cardSecurityCode,
          expirationDate: cardExpirationDate,
          password: '',
          isVirtual: false,
          isBlocked: false,
          type: cardType
      } 
    
      cardRepository.insert(cardData);
}