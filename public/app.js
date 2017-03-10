var url = document.URL;

var first = document.querySelector("#first");
var second = document.querySelector("#second");
var third = document.querySelector("#third");
var fourth = document.querySelector("#fourth");
var fifth = document.querySelector("#fifth");

var url_first = url + "/api/" + "https://www.google.com";
var url_second = url + "/api/" + "http://foo.com:80";
var url_third = "{'original_url':'https://www.google.com','short_url':'"+url+"16565350'}";
var url_fourth = url + "16565350";
var url_fifth = "https://google.com/";

first.textContent = url_first;
second.textContent = url_second;
third.textContent = url_third;
fourth.textContent = url_fourth;
fifth.textContent = url_fifth;