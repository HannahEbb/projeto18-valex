import { CardInsertData, findById, insert, TransactionTypes } from '../repositories/cardRepository';
import { findByApiKey } from '../repositories/companyRepository';

export async function createCard( apiKey: string, data: {employeeId: number, cardType: TransactionTypes}) {
    let isCompanyValid = await findByApiKey(apiKey)  //confirma no banco se essa chave é válida
    if(!isCompanyValid) {
        throw 'Company not registered' // manda para o middleware que trata o erro? Ainda não, senão vai ter q tipar o erro (assunto da proxima semana)
    }

    const  { employeeId, cardType } = data
    let isEmployeeRegistered = await findById(employeeId) // se esse empregado estiver cadastrado, todos os dados dele já estão no banco
    if(!isEmployeeRegistered) {
        throw 'Employee not registered' 
    }
    // tem que pegar os dados do employee no banco
    // tem que gerar o número do cartao, nome que vai no cartao (resumido), códico CSV, data de validade
    // senha, isVirtual, originalCardId sao vazios '', e isBlocked como false
    
    const cardData: CardInsertData = {
        employeeId,
        number: '22',
        cardholderName: 'Fulaninha',
        securityCode: '345',
        expirationDate: '05/25',
        password: 'aoiahroia',
        isVirtual: false,
        originalCardId: 34,
        isBlocked: false,
        type: cardType
    } 
    
    insert(cardData);
}