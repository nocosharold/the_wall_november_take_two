document.addEventListener("DOMContentLoaded", () => {
    const sign_in_form = document.querySelector("#sign_in_form");
    const sign_up_form = document.querySelector("#sign_up_form");

    sign_up_form.addEventListener("submit", submitSignUpForm);          /* This will submit Sign Up Form */
    sign_in_form.addEventListener("submit", submitSignInForm);          /* This will submit Sign In Form */
    selectAccessForm();
});

/**
 * DOCU: When Clicked. It will Show or Hide either Sign Up or Sign In Container <br>
 * Triggered: on page load <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function selectAccessForm() {
    const select_access_btns = document.querySelectorAll(".select_access_btn");

    for(let selected_btn of select_access_btns){
        selected_btn.addEventListener("click", (event) => {
            /* will remove hidden class on first element found */
            document.querySelectorAll(".container.hidden")[0].classList.remove("hidden");

            /* will add hidden class on nearest element */
            event.target.closest(".container").classList.add("hidden");
        });
    }
}

/**
 * DOCU: Checks the Sign up fields if no error it will redirect to the timeline page <br>
 * Triggered: sign_up_form.addEventListener("submit", submitSignUpForm); <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function submitSignUpForm(event){
    event.preventDefault();
    const sign_up_fields = document.querySelectorAll("#sign_up_form .form_input_field");

    validateInput(sign_up_fields);

    if(!(document.querySelectorAll("#sign_up_form .input_error").length)){
        window.location.href = `${ window.location.origin }/views/timeline.html`;
    }
}

/**
 * DOCU: Checks the Sign in fields if no error it will redirect to the timeline page <br>
 * Triggered: sign_in_form.addEventListener("submit", submitSignInForm); <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function submitSignInForm(event){
    event.preventDefault();
    const sign_in_fields = document.querySelectorAll("#sign_in_form .form_input_field");

    validateInput(sign_in_fields);

    if(!(document.querySelectorAll("#sign_in_form .input_error").length)){
        window.location.href = `${ window.location.origin }/views/timeline.html`;
    }
}

/**
 * DOCU: Checks if the fields has value else will display an error <br>
 * Triggered:   validateInput(sign_up_fields); <br>
 *              validateInput(sign_in_fields); <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function validateInput(form_input_fields){
    for(let input_field of form_input_fields){
        input_field.addEventListener("focus", () => {
            input_field.classList.remove("input_error");
        });
        if(input_field.value){
            input_field.classList.remove("input_error");
        }else{
            input_field.classList.add("input_error");
        }
    }
}