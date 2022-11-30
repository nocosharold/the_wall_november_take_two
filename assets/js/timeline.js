document.addEventListener("DOMContentLoaded", () => {
    const post_form = document.getElementById("post_form");
    const textarea = document.querySelector("textarea");

    textarea.addEventListener("focus", focusTextArea);          /* This will add active class on form when focused in textarea */
    post_form.addEventListener("submit", postTopic);            /* This will submit Post Form */
});
/**
 * DOCU: It takes the value of the topic textarea, creates a new topic container, adds the value to the topic <br>
 * container, and appends the topic container to the forum container <br>
 * Triggered: post_form.addEventListener("submit", postTopic); <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function postTopic(event){
    event.preventDefault();
    const post_text_field = document.querySelector("#post_text_field");
    const forum_container = document.getElementById("forum_container");
    const no_post = document.getElementById("no_post");
    const topic_container = document.querySelector(".topic_container.hidden").cloneNode(true);
    const topic_text = topic_container.querySelector(".topic_text");

    if(!post_text_field.value.trim().length){
        post_form.classList.add("input_error");
        post_form.classList.remove("active");
    }else{
        topic_container.setAttribute("class", "topic_container");
        topic_text.textContent = post_text_field.value;

        topic_container.querySelector(".create_response_form").addEventListener("submit", addResponse);
        topic_container.querySelector(".delete_topic_btn").addEventListener("click", transformDeleteBtn);
        topic_container.querySelector(".no_btn").addEventListener("click", transformDeleteBtn);
        topic_container.querySelector(".topic_yes_btn").addEventListener("click", deleteTopic);
        topic_container.querySelector(".edit_topic_btn").addEventListener("click", editTopic);
        topic_container.querySelector(".edit_topic_container_form").addEventListener("submit", saveTopic);
        topic_container.querySelector(".create_response_field").addEventListener("focus", focusTextArea);

        post_form.classList.remove("input_error");
        post_form.classList.remove("active");
        no_post.classList.add("hidden");
        post_text_field.value = "";

        forum_container.appendChild(topic_container);
    }
}

/**
 * DOCU: It takes the value of the response textarea, creates a new response_wrapper element, and appends the <br>
 * response_wrapper to the response_container. <br>
 * Triggered: topic_container.querySelector(".create_response_form").addEventListener("submit", addResponse); <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function addResponse(event){
    event.preventDefault();
    const create_response_form = event.target;
    const response_container = create_response_form.closest(".topic_container").querySelector(".response_container");
    const response_wrapper = create_response_form.closest(".topic_container").querySelector(".response_wrapper.hidden").cloneNode(true);
    const create_response_field = create_response_form.querySelector(".create_response_field");

    if(!(create_response_field.value.trim().length)){
        create_response_field.closest("form").classList.add("input_error");
    }else{
        response_wrapper.querySelector(".edit_response_btn").addEventListener("click", editResponse);
        response_wrapper.querySelector(".edit_response_form").addEventListener("submit", saveResponse);
        response_wrapper.querySelector(".delete_response_btn").addEventListener("click", transformDeleteBtn);
        response_wrapper.querySelector(".no_btn").addEventListener("click", transformDeleteBtn);
        response_wrapper.querySelector(".response_yes_btn").addEventListener("click", deleteResponse);
        response_wrapper.querySelector("textarea").addEventListener("click", focusTextArea);

        response_wrapper.setAttribute("class", "response_wrapper");
        response_wrapper.querySelector(".response_text").innerHTML = create_response_field.value;
        create_response_field.closest("form").classList.remove("active");
        create_response_field.closest("form").classList.remove("input_error");
        create_response_field.value = "";

        response_container.appendChild(response_wrapper);
    }
}

/**
 * DOCU: When Clicked. will toggle class active on closest element with delete_btn_container class <br>
 * Triggered: topic_container.querySelector(".delete_topic_btn").addEventListener("click", transformDeleteBtn); <br>
 *            topic_container.querySelector(".no_btn").addEventListener("click", transformDeleteBtn); <br>
 *            response_wrapper.querySelector(".delete_response_btn").addEventListener("click", transformDeleteBtn); <br>
 *            response_wrapper.querySelector(".no_btn").addEventListener("click", transformDeleteBtn); <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function transformDeleteBtn(event){
    const delete_btn = event.target;
    delete_btn.closest(".delete_btn_container").classList.toggle("active");
}

/**
 * DOCU: When Clicked. It removes the closest topic_container to the topic_yest_btn <br>
 * Triggered: topic_container.querySelector(".topic_yes_btn").addEventListener("click", deleteTopic); <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function deleteTopic(event){
    const topic_yes_btn = event.target;
    const topic_container = document.querySelectorAll(".topic_container");
    const no_post = document.getElementById("no_post");

    if(topic_container.length === 2){
        no_post.classList.remove("hidden");
    }

    topic_yes_btn.closest(".topic_container").remove();
}

/**
 * DOCU: When Clicked, edit topic text value will transfer to edit text field then will show its form <br>
 * Triggered: topic_container.querySelector(".edit_topic_btn").addEventListener("click", editTopic); <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function editTopic(event){
    const edit_topic_btn = event.target;
    const topic_text = edit_topic_btn.closest(".topic_container").querySelector(".topic_text");
    const edit_topic_container_field = edit_topic_btn.closest(".topic_container").querySelector(".edit_topic_container_field");

    edit_topic_btn.closest(".topic_container").querySelector(".edit_topic_container").classList.toggle("hidden");
    edit_topic_container_field.value = topic_text.textContent;
}

/**
 * DOCU: It takes the value of the input field, and replaces the text of the topic_text element with it. <br>
 * Triggered: topic_container.querySelector(".edit_topic_container_form").addEventListener("submit", saveTopic); <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function saveTopic(event){
    event.preventDefault();

    const edit_topic_container_form = event.target;
    const edit_topic_container_field = edit_topic_container_form.querySelector(".edit_topic_container_field");
    const topic_text = edit_topic_container_form.closest(".topic_container").querySelector(".topic_text");
    const edit_topic_container = edit_topic_container_form.closest(".edit_topic_container");

    if(!(edit_topic_container_field.value.trim().length)){
        edit_topic_container_field.closest("form").classList.add("input_error");
    }else{
        edit_topic_container_field.closest("form").classList.remove("input_error");
        topic_text.textContent = edit_topic_container_field.value;
        edit_topic_container.classList.add("hidden");
    }
}

/**
 * DOCU: If the event target is a textarea, then remove the class "input_error" and add the class "active" to <br>
 * the textarea. <br>
 * Triggered: topic_container.querySelector(".create_response_field").addEventListener("focus", focusTextArea); <br>
 *            response_wrapper.querySelector("textarea").addEventListener("click", focusTextArea); <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function focusTextArea(event){
    const textarea = event.target.closest("form");

    textarea.classList.remove("input_error");
    textarea.classList.add("active");
}

/**
 * DOCU: When the edit button is clicked, the edit response container is shown and the edit response field is <br>
 * populated with the response text <br>
 * Triggered: response_wrapper.querySelector(".edit_response_btn").addEventListener("click", editResponse); <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function editResponse(event){
    const edit_response_btn = event.target;
    const response_text = edit_response_btn.closest(".response_wrapper").querySelector(".response_text");
    const edit_response_field = edit_response_btn.closest(".response_wrapper").querySelector(".edit_response_field");

    edit_response_btn.closest(".response_wrapper").querySelector(".edit_response_container").classList.toggle("hidden");
    edit_response_field.value = response_text.textContent;
}

/**
 * DOCU: It takes the value of the input field, and replaces the text of the response_text element with it. <br>
 * Triggered: response_wrapper.querySelector(".edit_response_form").addEventListener("submit", saveResponse); <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function saveResponse(event){
    event.preventDefault();

    const edit_response_form = event.target;
    const edit_response_field = edit_response_form.querySelector(".edit_response_field");
    const response_text = edit_response_form.closest(".response_wrapper").querySelector(".response_text");
    const edit_response_container = edit_response_form.closest(".edit_response_container");

    if(!edit_response_field.value.trim().length){
        edit_response_field.closest("form").classList.add("input_error");
    }else{
        edit_response_field.closest("form").classList.remove("input_error");
        response_text.textContent = edit_response_field.value;
        edit_response_container.classList.add("hidden");
    }
}

/**
 * DOCU: When the user clicks on the delete button, find the closest parent element with the class <br>
 * "response_wrapper" and remove it. <br>
 * Triggered: response_wrapper.querySelector(".response_yes_btn").addEventListener("click", deleteResponse); <br>
 * Last Updated Date: November 30, 2022
 * @author Harold
 */
function deleteResponse(event){
    event.target.closest(".response_wrapper").remove();
}