$(document).ready(function() {

    $("#rangoPrecio").ionRangeSlider({
        type: "double",
        grid: false,
        min: 0,
        max: 100000,
        from: 1000,
        to: 20000,
        prefix: "$"
    });

    init();
    setSearch();

    $('#buscar').click(function() {

        if ($("#checkPersonalizada")[0].checked) {
            if (($("#ciudad").val() && !($("#tipo").val()))) {
                var valores = $("#rangoPrecio").val();
                valores = valores.split(";");
                console.log('1')
                console.log(valores)
                console.log($("#ciudad").val())
                console.log($("#tipo").val())
                var urls = `http://localhost:3000/ciudad/${$("#ciudad").val()}/desde/${valores[0]}/hasta/${valores[1]}`;
            } else if (($("#tipo").val() && !($("#ciudad").val()))) {
                var valores = $("#rangoPrecio").val();
                valores = valores.split(";");
                console.log('1')
                console.log(valores)
                console.log($("#ciudad").val())
                console.log($("#tipo").val())
                var urls = `http://localhost:3000/tipo/${$("#tipo").val()}/desde/${valores[0]}/hasta/${valores[1]}`;
            } else {
                var valores = $("#rangoPrecio").val();
                valores = valores.split(";");
                console.log('1')
                console.log(valores)
                console.log($("#ciudad").val())
                console.log($("#tipo").val())
                var urls = `http://localhost:3000/ciudad/${$("#ciudad").val()}/tipo/${$("#tipo").val()}/desde/${valores[0]}/hasta/${valores[1]}`;
            }
        } else {
            var urls = "http://localhost:3000/search";
        }

        $.ajax({
                url: urls,
                type: 'get',
                dataType: 'json'
            })
            .done(function(data) {
                if (!data.error) {
                    console.log(data);
                    $('.lista').html(renderCard(data.datos));
                }
            })
    });



    function renderSelect(data) {

        var html = '';
        data.forEach(function(key, idx) {
            html += `<option value="${key}">${key}</option>`;
        });
        return html;
    }

    function renderCard(objArr) {
        console.log(objArr)
        var html = '';

        objArr.forEach(function(key, idx) {
            html += `<div class="card horizontal">
                    <div class="card-image">
                        <img src="http://localhost:3000/img/home.jpg">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            <div> <p><strong>Direccion: </strong>${ key.Direccion }</p> </div>
                            <div> <p><strong>Ciudad: </strong>${ key.Ciudad }</p> </div>
                            <div> <p><strong>Telefono: </strong>${ key.Telefono }</p> </div>
                            <div> <p><strong>Código postal: </strong>${ key.Codigo_Postal }</p> </div>
                            <div> <p><strong>Precio: </strong>${ key.Precio }</p> </div>
                            <div> <p><strong>Tipo: </strong>${ key.Tipo }</p> </div>
                        </div>
                    </div>
                </div>`;
        });
        return html;
    }

    function init() {
        $.ajax({
                url: 'http://localhost:3000/filteroptions',
                type: 'get',
                dataType: 'json'
            })
            .done(function(data) {
                if (!data.error) {
                    console.log(data);
                    $('#ciudad').append(renderSelect(data.ciudades));
                    $('#tipo').append(renderSelect(data.tipos));
                    $("#ciudad").material_select();
                    $("#tipo").material_select();
                }
            });
    }

    function setSearch() {
        let busqueda = $('#checkPersonalizada');
        busqueda.on('change', (e) => {
            this.customSearch = !this.customSearch;
            $('#personalizada').toggleClass('invisible');
        });
    }
});