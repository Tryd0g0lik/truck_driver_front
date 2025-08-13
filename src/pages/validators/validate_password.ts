/**
 * src\pages\validators\validate_password.ts
 */
/***
 * Validator for the filed 'email'.
 * @param {{string}} email: 
 * @return {{boolean}} true if all Ok and false.
 */
async function async_regex_validate_of_password(password: string): Promise<boolean> {
    
    const regex = /([\w%]{9,255})/.test(password);
    console.log(`regex_validate_of_email VALIDATER return: ${regex} `);
    
    if (regex){
        return true;
    }
    return false;
};
export default async_regex_validate_of_password;
