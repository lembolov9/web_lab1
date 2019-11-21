let Hogan =  require('hogan.js/web/builds/3.0.2/hogan-3.0.2.js')
let template = Hogan.compile(
    `{{#weather}}<div class="wrapper"><div class="main">{{weather.description}}</div>
        <div>Температура<br>{{weather.temp}} градусов цельсия</div><div>Давление<br>{{weather.pressure}} мм.рт.с.</div> 
        <div>Влажность<br>{{weather.humidity}} %</div><div>Скорость ветра<br>{{weather.speed}} м/c</div>
        </div>{{/weather}}{{#error}}{{error}}{{/error}}`
);

export default template;