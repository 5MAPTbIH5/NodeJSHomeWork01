//const http = require('http');
const settings = require("./server_settings");
const routes = require("./routes");
const express = require('express');
const app = express();

let persona = null;

app.use(express.urlencoded({extended: false}));

app.get("", (req, resp) => {
    resp.redirect("/home");
});

app.get("/home", (req, resp) => {
    let date = new Date();
    let currDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    // resp.sendFile(__dirname + routes.home);
    resp.send(`
    <h1>Главная страница</h1>
    <h3>Текущая дата: ${currDate}</h3>
    <div>
        <h4><a href="${routes.data}">Информация о пользователе</a></h4>
        <h4><a href="${routes.add}">Форма для заполнения</a></h4>
    </div>`);
});

app.get("/data", (req, resp) => {
    resp.send(`
    <form>
        <table>
            <tr>
                <td><label>Имя</label></td>
                <td><label>${persona != null ? persona.firstName : "Не определено"}</td>
            </tr>
            <tr>
                <td><label>Фамилия</label></td>
                <td><label>${persona != null ? persona.lastName : "Не определено"}</td>
            </tr>
            <tr>
                <td><label>Возраст</label></td>
                <td><label>${persona != null ? persona.age : "Не определено"}</td>
            </tr>
            <tr>
                <td><label>E-mail</label></td>
                <td><label>${persona != null ? persona.email : "Не определено"}</td>
            </tr>
            <tr>
                <td><label>Страна</label></td>
                <td><label>${persona != null ? persona.country : "Не определено"}</td>
            </tr>
            <tr>
                <td><label>Город</label></td>
                <td><label>${persona != null ? persona.city : "Не определено"}</td>
            </tr>
        </table>
    </form>`);
});

app.get("/add", (req, resp) => {
    // resp.sendFile(__dirname + routes.add);
    resp.send(`
    <form method="POST">
        <table>
            <tr>
                <td><label>Имя</label></td>
                <td><input type="text" name="firstName" placeholder="Введите имя..." value="${persona != null ? persona.firstName : ""}"></td>
            </tr>
            <tr>
                <td><label>Фамилия</label></td>
                <td><input type="text" name="lastName" placeholder="Введите фамилию..." value="${persona != null ? persona.lastName : ""}"></td>
            </tr>
            <tr>
                <td><label>Возраст</label></td>
                <td><input type="number" name="age" min="1" max="150" value="${persona != null ? persona.age : ""}"></td>
            </tr>
            <tr>
                <td><label>E-mail</label></td>
                <td><input type="email" name="email" placeholder="Введите E-mail..." value="${persona != null ? persona.email : ""}"></td>
            </tr>
            <tr>
                <td><label>Страна</label></td>
                <td><input type="text" name="country" placeholder="Введите страну..." value="${persona != null ? persona.country : ""}"></td>
            </tr>
            <tr>
                <td><label>Город</label></td>
                <td><input type="text" name="city" placeholder="Введите город..." value="${persona != null ? persona.city : ""}"></td>
            </tr>
        </table>
        <button>Отправить данные</button>
    </form>`);
    // persona = null;
});

app.post("/add", (req, resp) => {
    console.log(req.body);

    persona = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            country: req.body.country,
            city: req.body.city
        };
    resp.redirect("/add");

    // resp.sendFile(__dirname + routes.add, {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     age: req.body.age,
    //     email: req.body.email,
    //     country: req.body.country,
    //     city: req.body.city
    // });
});

app.listen(settings.port, settings.host);