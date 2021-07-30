import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()
export class BlogService {
  options;
  domain = this.authService.domain;

  constructor(private authService: AuthService, private http: HttpClient) {}

  createAuthenticationHeaders() {
    this.authService.loadToken();
    this.options = new HttpHeaders({
      "Content-Type": "application/json",
      authorization: this.authService.authToken,
    });
  }

  newBlog(blog) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + "/api/newBlog", blog, {
      headers: this.options,
    });
  }

  getAllBlogs() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + "/api/allBlogs", {
      headers: this.options,
    });
  }

  getSingleBlog(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + "/api/singleBlog/" + id, {
      headers: this.options,
    });
  }

  editBlog(blog) {
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + "/api/updateBlog", blog, {
      headers: this.options,
    });
  }

  deleteBlog(id) {
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + "/api/deleteBlog/" + id, {
      headers: this.options,
    });
  }

  likeBlog(id) {
    const blogData = { id: id };
    return this.http.put(this.domain + "/api/likeBlog", blogData, {
      headers: this.options,
    });
  }

  dislikeBlog(id) {
    const blogData = { id: id };
    return this.http.put(this.domain + "/api/dislikeBlog", blogData, {
      headers: this.options,
    });
  }

  postComment(id, comment) {
    console.log(id);
    console.log(comment);

    this.createAuthenticationHeaders();
    const blogData = {
      id: id,
      comment: comment,
    };
    return this.http.post(this.domain + "/api/comment", blogData, {
      headers: this.options,
    });
  }
}
