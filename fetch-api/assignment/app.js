"use strict";

const BASIC_URL = "https://jsonplaceholder.typicode.com";

class App {
  #posts;
  #formSubmitBtn = document.querySelector("#add-post");
  #form = document.querySelector("#post-form");
  #postsContainer = document.querySelector(".posts");
  #formTitle = document.querySelector("#new-post-title");
  #formBody = document.querySelector("#new-post-body");

  constructor() {
    this.#posts = [];
    this.init();
  }

  async init() {
    this.#formSubmitBtn.addEventListener(
      "click",
      this.#handleFormSubmit.bind(this)
    );
    this.#posts = await this.#getPosts();
    if (this.#posts.length > 0) {
      this.#renderPosts();
    }
  }

  async #getPosts() {
    try {
      const response = await fetch(`${BASIC_URL}/posts`);
      if (!response.ok) {
        console.log(response);
        throw new Error("Error fetching posts");
      }
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  #handleFormSubmit(e) {
    e.preventDefault();
    const title = this.#form.querySelector("#new-post-title").value;
    const body = this.#form.querySelector("#new-post-body").value;
    this.#createNewPost(title, body);
  }

  async #createNewPost(title, body) {
    try {
      const response = await fetch(`${BASIC_URL}/posts`, {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Error creating post");
      }
      const data = await response.json();
      console.log(data);
      this.#posts.push(data);
      this.#postsContainer.insertBefore(
        this.#createPostElement(data),
        this.#postsContainer.firstChild
      );
      this.#formTitle.value = "";
      this.#formBody.value = "";
    } catch (error) {
      console.error(error);
    }
  }

  #renderPosts() {
    this.#posts.forEach((post) => {
      const postEl = this.#createPostElement(post);
      this.#postsContainer.insertBefore(
        postEl,
        this.#postsContainer.firstChild
      );
    });
  }

  #createPostElement(post) {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    const titleEl = document.createElement("div");
    titleEl.classList.add("post-title");
    titleEl.textContent = post.title;
    postEl.appendChild(titleEl);
    const bodyEl = document.createElement("div");
    bodyEl.classList.add("post-body");
    bodyEl.innerText = `${post.body}`;
    postEl.appendChild(bodyEl);
    return postEl;
  }
}

const app = new App();
