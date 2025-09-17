/**
 * /src/service/errorMessageForFields.ts
**/

type Props = {
    htmlContainer?: HTMLElement|undefined
    message?: string
    title?: string
    include?:number
    top?: boolean
};

/***
 * @warnedMeaasege - function for warning the user about the incorrect data in the field of form.
 * @param {HTMLElement} htmlContainer - HTMLElement/container html where you need inser the new html-box for \
 * to publish a message of the warn-message.
 * @param {string} message - message of the warn-message (text of warn-message). Default value is "Fill out the field with correct data..".
 * @param {string}title - title for html-container where is text of the warn-message. Default value is "Field is emtry!".
 * @param {number}include - number for include the html-box of warn-message. Default value is number 0 - serch/find end remove html-box from war-message.
 * @param {boolean} top - boolean for position of html-box of warn-message. Default value is false it means - bottom of html-container.
 */
async function warnedMeaasege(props: Props): Promise<boolean> {
    const{
        htmlContainer = undefined,
        message ="Fill out the field with correct data.",
        title = "Field is emtry!",
        include=0,
        top=false
    } = props;
    
    if (include === 1){
        const messageError = document.createElement("div");
        const spanHtml = document.createElement("span");
        messageError.className = "active warned-message";
        spanHtml.textContent = message;
        messageError.innerHTML = spanHtml.outerHTML;
        const pb = (window.getComputedStyle(htmlContainer as HTMLElement).paddingBottom).split("px")[0];
        
        if (!top){
        messageError.style.bottom = `-${Number(pb)  }px`;
        }else{
            messageError.style.top = "0px";
        }
        if (title){
            messageError.insertAdjacentHTML(
                "afterbegin",
                `<h3 class="title">${title}</h3>`
            );
        }
        htmlContainer?.insertAdjacentHTML("beforeend", messageError.outerHTML);
        return false;
    }
    const divHTmllArr = document.querySelectorAll(".warned-message");
    divHTmllArr.length > 0 ? divHTmllArr .forEach((item) => item.remove()) : null;
    
    return true;
}
export default warnedMeaasege;
