$("#alert").hide();

var rnd;
var rndPage;

$("#Btn").click(function(){
    $("#contSpinner").addClass("spinner-border text-warning");

    try{
        rndPage =Math.floor(Math.random() * 4)+1;
        $.get("https://swapi.co/api/starships/?page="+rndPage,result);
        document.getElementById('alert').className="alert alert-warning";
        $("#alert").text("Votre vaisseau à été trouvé!");
        $("#alert").show();
    }
    catch (e) {
        document.getElementById('alert').className="alert alert-danger";
        $("#alert").text("Une ERREUR est survenue lors de la recherche du vaisseau!");
        $("#alert").show();

    }
    $("#contSpinner").removeClass("spinner-border text-warning");
});


function result(donnee,status) {
    rnd=random();
    $("#Btn").attr("disabled",true);
    $("#nomShip").text(donnee.results[rnd].name);
    $("#modShip").text(donnee.results[rnd].model);
    $("#classShip").text(donnee.results[rnd].starship_class);
    $("#fabShip").text(donnee.results[rnd].manufacturer);
    $("#coutShip").text(donnee.results[rnd].cost_in_credits);
    $("#tailleShip").text(donnee.results[rnd].length);
    $("#nbMem").text(donnee.results[rnd].crew);
    $("#nbPass").text(donnee.results[rnd].passengers);
    $("#capShip").text(donnee.results[rnd].cargo_capacity);

    var Parent = document.getElementById("tblPilote");
    while(Parent.hasChildNodes())
    {
        Parent.removeChild(Parent.firstChild);
    }
    $("#tblPilote").append("<tr><th>nom</th><th>sexe</th></tr>");
    donnee.results[rnd].pilots.forEach(function(item,index){
        $.get(item,loadPilote)
    });
    var Parent = document.getElementById("tblFilm");
    while(Parent.hasChildNodes())
    {
        Parent.removeChild(Parent.firstChild);
    }
    $("#tblFilm").append("<tr><th>titre</th><th>directeur</th><th>date de sortie</th></tr>");
    donnee.results[rnd].films.forEach(function(item,index){
        $.get(item,loadFilms)
    });
    $('#Btn').attr("disabled", false);
};


function loadPilote(donnee,status) {
    var txt2 = "<tr>";
    var txt3 = $("<td></td>").text(donnee.name);
    var txt4 = $("<td></td>").text(donnee.gender);
    var txt5= "</tr>";
    $("#tblPilote").append(txt2,txt3,txt4,txt5);
};


function loadFilms(donnee,status) {
    console.log(donnee);
    var txt2 = "<tr>";
    var txt3 = $("<td></td>").text(donnee.title);
    var txt4 = $("<td></td>").text(donnee.director);
    var txt5 = $("<td></td>").text(donnee.release_date);
    var txt6= "</tr>";
    $("#tblFilm").append(txt2,txt3,txt4,txt5,txt6);

};


function random()
{
    if(rndPage===4)
    {
        return Math.floor(Math.random() * 6);
    }
    else{
        return Math.floor(Math.random() * 10);
    }
};