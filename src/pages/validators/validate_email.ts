/***
 * Validator for the filed 'email'.
 * @param {{string}} email: 
 * @return {{boolean}} true if all Ok and false.
 */
async function async_regex_validate_of_email(email: string): Promise<boolean> {
    
    const regex = /(\w+@\w+\.\w+)/.test(email);
    console.log(`regex_validate_of_email VALIDATER return: ${regex} `);
    
    if (regex){
        return true;
    }
    return false;
};
export default async_regex_validate_of_email;
