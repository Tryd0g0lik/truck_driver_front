/***
 * Validator for the filed 'username'.
 * @param {{string}} userName: min-lenght is 3 symbol and max-lenght is 50. 
 * @return {{boolean}} true if all Ok and false.
 */
async function async_regex_validate_of_username(userName: string): Promise<boolean> {
    
    const regex = /(^[a-zA-Z]\w{3,50}_{0,2})/;
    const userNameLen = userName.length;
    try {
        
    console.log(`regex_validate_of_username VALIDATER return: ${regex.test(userName)} `);
    if (regex.test(userName) && userNameLen >= 3 && userNameLen <=50){
        return true;
    }
    
    }catch (error: Error | unknown){
        console.error(`regex_validate_of_username VALIDATER return: ${error} `);

    }
    return false;
};

export default async_regex_validate_of_username;
