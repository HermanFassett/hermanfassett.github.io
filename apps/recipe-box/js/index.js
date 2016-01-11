"use strict";

var Panel = ReactBootstrap.Panel,
    Accordion = ReactBootstrap.Accordion;
var Button = ReactBootstrap.Button,
    Input = ReactBootstrap.Input;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Modal = ReactBootstrap.Modal;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var ListGroup = ReactBootstrap.ListGroup,
    ListGroupItem = ReactBootstrap.ListGroupItem;

// Load Recipe Items or set default Recipe Items
var recipes = typeof localStorage["recipeBook"] != "undefined" ? JSON.parse(localStorage["recipeBook"]) : [{ title: "Pumpkin Pie", ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"] }, { title: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"] }, { title: "Onion Pie", ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"] }],
    globalTitle = "",
    globalIngredients = []; // Define global title and ingredients

// RecipeBook class. This holds all recipes.
var RecipeBook = React.createClass({
  displayName: "RecipeBook",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        Accordion,
        null,
        this.props.data
      )
    );
  }
});

// Recipe class. This is the display for a recipe in RecipeBook
var Recipe = React.createClass({
  displayName: "Recipe",

  remove: function remove() {
    recipes.splice(this.props.index, 1);
    update();
  },
  edit: function edit() {
    globalTitle = this.props.title;
    globalIngredients = this.props.ingredients;
    document.getElementById("show").click();
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h4",
        { className: "text-center" },
        "Ingredients"
      ),
      React.createElement("hr", null),
      React.createElement(IngredientList, { ingredients: this.props.ingredients }),
      React.createElement(
        ButtonToolbar,
        null,
        React.createElement(
          Button,
          { "class": "delete", bsStyle: "danger", id: "btn-del" + this.props.index, onClick: this.remove },
          "Delete"
        ),
        React.createElement(
          Button,
          { bsStyle: "default", id: "btn-edit" + this.props.index, onClick: this.edit },
          "Edit"
        )
      )
    );
  }
});

// IngredientList class. This lists all ingredients for a Recipe
var IngredientList = React.createClass({
  displayName: "IngredientList",

  render: function render() {
    var ingredientList = this.props.ingredients.map(function (ingredient) {
      return React.createElement(
        ListGroupItem,
        null,
        ingredient
      );
    });
    return React.createElement(
      ListGroup,
      null,
      ingredientList
    );
  }
});

// RecipeAdd class. This contains the Modal and Add Recipe button
var RecipeAdd = React.createClass({
  displayName: "RecipeAdd",

  getInitialState: function getInitialState() {
    return { showModal: false };
  },
  close: function close() {
    globalTitle = "";
    globalIngredients = [];
    this.setState({ showModal: false });
  },
  open: function open() {
    this.setState({ showModal: true });
    if (document.getElementById("title") && document.getElementById("ingredients")) {
      $("#title").val(globalTitle);
      $("#ingredients").val(globalIngredients);
      if (globalTitle != "") {
        $("#modalTitle").text("Edit Recipe");
        $("#addButton").text("Edit Recipe");
      }
    } else requestAnimationFrame(this.open);
  },
  add: function add() {
    var title = document.getElementById("title").value;
    var ingredients = document.getElementById("ingredients").value.split(",");
    var exists = false;
    for (var i = 0; i < recipes.length; i++) {
      if (recipes[i].title === title) {
        recipes[i].ingredients = ingredients;
        exists = true;
        break;
      }
    }
    if (!exists) {
      if (title.length < 1) title = "Untitled";
      recipes.push({ title: title, ingredients: document.getElementById("ingredients").value.split(",") });
    }
    update();
    this.close();
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        Button,
        {
          bsStyle: "primary",
          bsSize: "large",
          onClick: this.open,
          id: "show"
        },
        "Add Recipe"
      ),
      React.createElement(
        Modal,
        { show: this.state.showModal, onHide: this.close },
        React.createElement(
          Modal.Header,
          { closeButton: true },
          React.createElement(
            Modal.Title,
            { id: "modalTitle" },
            "Add a Recipe"
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(
            "form",
            null,
            React.createElement(Input, { type: "text", label: "Recipe", placeholder: "Recipe Name", id: "title" }),
            React.createElement(Input, { type: "textarea", label: "Ingredients", placeholder: "Enter Ingredients,Separated,By Commas", id: "ingredients" })
          )
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { onClick: this.add, bsStyle: "primary", id: "addButton" },
            "Add Recipe"
          ),
          React.createElement(
            Button,
            { onClick: this.close },
            "Close"
          )
        )
      )
    );
  }
});

// Update function to display all the recipes
function update() {
  localStorage.setItem("recipeBook", JSON.stringify(recipes));
  var rows = [];
  for (var i = 0; i < recipes.length; i++) {
    rows.push(React.createElement(
      Panel,
      { header: recipes[i].title, eventKey: i, bsStyle: "success" },
      React.createElement(Recipe, { title: recipes[i].title, ingredients: recipes[i].ingredients, index: i })
    ));
  }
  ReactDOM.render(React.createElement(RecipeBook, { data: rows }), document.getElementById("container"));
}

// Render the add button (and modal)
ReactDOM.render(React.createElement(RecipeAdd, null), document.getElementById("button"));
update(); // Initially render the recipe book
