class Person {
    constructor(name, email, mobile, landline, website, address) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.landline = landline;
        this.website = website;
        this.address = address;
    }
}
var people = [{name:"Chandermani Arora",email:"chandermani@technovert.com",mobile:"+91 9292929292",landline:"040301231211",website:"http://www.technovert.com",address:"123 now here\nSome street\nMadhapur, Hyderabad 500033"},
{name:"Sashi Pagadala",email:"sashi@technovert.com",mobile:"+91 9985528844",landline:"040301231211",website:"http://www.technovert.com",address:"123 now here\nSome street\nMadhapur, Hyderabad 500033"},
{name:"Praveen Battula",email:"praveen@technovert.com",mobile:"+91 9985016232",landline:"040301231211",website:"http://www.technovert.com",address:"123 now here\nSome street\nMadhapur, Hyderabad 500033"},
{name:"Vijay Yalamanchili",email:"vijay@technovert.com",mobile:"+91 9985016232",landline:"040301231211",website:"http://www.technovert.com",address:"123 now here\nSome street\nMadhapur, Hyderabad 500033"}];
localStorage.setItem("contacts",JSON.stringify(people));
let counter = 0;
let variable = "singleContact";
function show(){
    for(let i=0;i<people.length;i++){
        addContact(people[i],i);
    }
}
function addContact(newPerson, i) {
    let div = "<div class='singleContact'></div>";
    $("#contact-list").append(div);
    $("#contact-list div").last().attr("id", variable + i);
    $("#contact-list div").last().attr("onclick", "displayDetails(this.id)");
    $("#contact-list div").last().html("<h1 class='Name'>" + newPerson.name + "</h1><p class='Mail'>" + newPerson.email + "</p><p class='Mobile'>" + newPerson.mobile + "</p>");
    $("#formpage").trigger("reset");
    $('.contactInfo').css({ display: "none" });
}
function displayDetails(id) {
    $('.contactInfo').css({ display: "block" });
    $('#formpage').css({ display: "none" });
    $('#formpage-container').css({ display: "none" });
    var i = id[id.length - 1];
    counter = i;
    $('#detailedName').text(people[i].name);
    $('#detailedEmail').text(people[i].email);
    $('#detailedMobile').text(people[i].mobile);
    $('#detailedLandline').text(people[i].landline);
    $('#detailedWebsite').text(people[i].website);
    $('#detailedAddress').text(people[i].address);
}
function showform(){
    $("#formpage").trigger("reset");
    $("#formpage").css("display", "block");
    $("#formpage-container").css("display", "block");
    $('.contactInfo').css({display:"none"});
    $('#subButton').val('Add');
    $('#subButton').removeAttr('onclick');
    $('#subButton').attr('onclick','getDetails()');
}
function getDetails() {
    if(confirm("Are you sure you want to add new contact details")){
    let name = $("#name").val();
    let email = $("#mail").val();
    let mobile = $("#mobile").val();
    let landline = $("#landline").val();
    let website = $("#website").val();
    let address = $("#address").val();
    var newPerson = new Person(name, email, mobile, landline, website, address);
    people.push(newPerson);
    localStorage.setItem("contacts",JSON.stringify(people));
    addContact(newPerson, people.length - 1);
    $('#formpage').css({ display: "none" });
    $('#formpage-container').css({ display: "none" });
    displayDetails(variable+(people.length-1));
}
}
function getEdit() {
    $('.contactInfo').css({ display: "none" });
    $("#formpage").css("display", "block");
    $("#formpage-container").css("display", "block");
    $('#subButton').val('Edit');
    $('#subButton').removeAttr('onclick');
    $('#subButton').attr('onclick', 'editFunction()');
    $('#name').val($('#detailedName').text());
    $('#mail').val($('#detailedEmail').text());
    $('#mobile').val($('#detailedMobile').text());
    $('#landline').val($('#detailedLandline').text());
    $('#website').val($('#detailedWebsite').text());
    $('#address').val($('#detailedAddress').text());
}

function editFunction() {
    console.log("editfunction called");
    if (confirm("Are you sure you want to edit " + people[counter].name + "'s details")) {
        people[counter].name = $('#name').val();
        people[counter].email = $('#mail').val();
        people[counter].mobile = $('#mobile').val();
        people[counter].landline = $('#landline').val();
        people[counter].website = $('#website').val();
        people[counter].address = $('#address').val();
        $("#" + variable + counter).find(".Name").text(people[counter].name);
        $("#" + variable + counter).find('.Mail').text(people[counter].email);
        $("#" + variable + counter).find('.Mobile').text(people[counter].mobile);
        displayDetails(variable + counter);
    }
}
function deleteDetails(){
    let delname=$('#detailedName').text();
    if(confirm("Are you sure you want to delete "+delname+"'s details")==true){
        for(let i=0;i<people.length;i++){
            if(people[i].name==delname){
                // console.log((people[i].name).parent().attr("id"));
                $("#"+variable+i).remove();
                people.splice(i,1);
                localStorage.setItem("contacts",JSON.stringify(people));
                $(".contactInfo").css({display:"none"});
            }
        }
    }
}
$(function () {
    show();
    $('.contactInfo').css({ display: "none" });
    $('#formpage').css({ display: "none" });
    $('#formpage-container').css({ display: "none" });
    $("#addBtn").on("click", function () {
       showform();
    });
    $("#edit").on("click", function () {
        getEdit();
    });
    $('#delete').on("click",(function(){deleteDetails();}));
    $("#home").on("click",function(){
        $('.contactInfo').css({ display: "none" });
        $('#formpage').css({ display: "none" });
        $('#formpage-container').css({ display: "none" });
    })
})
