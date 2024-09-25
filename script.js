const myCharactersQuotes = [
  {
    citation: "Un Lannister paie toujours ses dettes.",
    name: "Tyrion Lannister",
  },

  {
    citation: "Un lion ne se soucie guère de ce que pensent les moutons.",
    name: "Tywin Lannister",
  },

  {
    citation: "Tu ne sais rien Jon Snow.",
    name: "Ygritte",
  },

  {
    citation:
      "Je n’ai pas d’épée, mais, si j’en avais une, je te la passerais au travers du ventre et trancherais les couilles à ces quatre pleutres.",
    name: "Jamie Lannister",
  },

  {
    citation:
      "Quand la neige tombe, et souffle le vent, le loup solitaire meurt mais pas la meute.",
    name: "Sansa Stark",
  },

  {
    citation: "Préparez-vous, l'hiver arrive !",
    name: "Ned Stark",
  },

  {
    citation:
      "Père, Smith, Guerrier, Mère, Jeune Fille, Vieille, Étranger, je suis à elle et elle est à moi depuis ce jour jusqu'à la fin de mes jours.",
    name: "Rob Stark",
  },

  {
    citation:
      "Laissez un loup en vie et les moutons ne sont jamais en sécurité.",
    name: " Arya Stark",
  },

  {
    citation:
      "Le pouvoir réside là où on se l'imagine. Même un petit homme peut projeter une grande ombre.",
    name: "Varys",
  },

  {
    citation:
      "Le chaos n'est pas une fosse, le chaos est une échelle. Seule l'échelle est réelle. Seule l'ascension importe.",
    name: "Petyr Baelish",
  },

  {
    citation: "Quand on joue au jeu des Trônes, soit on gagne, soit on meurt.",
    name: "Cersei Lannister",
  },

  {
    citation:
      "Je sais que tu es très loin mais, reviens à moi, mon soleil et mes étoiles.",
    name: "Daenerys Targaryen",
  },

  {
    citation: "Il ne s'arrête de manger que lorsque c'est l'heure de boire.",
    name: "Catelyn Stark",
  },

  {
    citation: "Je m'appelle Theon. Vous devez connaître votre nom.",
    name: "Theon Greyjoy",
  },

  {
    citation:
      "On dit que Stannis ne sourit jamais. Je lui ferai un sourire rouge, d'une oreille à l'autre.",
    name: "Joffrey Baratheon",
  },

  {
    citation: "L’ennui révèle le manque de richesse intérieure.",
    name: "Stannis Baratheon",
  },

  {
    citation:
      "Tu es la lune de mes nuits, c'est tout ce que je sais et tout ce que j'ai besoin de savoir et si c'est un rêve je tuerai l'homme qui essaye de me réveiller.",
    name: "Khal Drogo",
  },

  {
    citation:
      "Toute ma vie, des hommes comme toi se sont moqués de moi, et toute ma vie, j'ai fait mordre la poussière à des hommes comme toi.",
    name: "Brienne of Tarth",
  },

  {
    citation: "Mon peuple est pacifique. Nous ne pouvons pas nous protéger.",
    name: "Missandei",
  },

  {
    citation: "Jouons à un jeu...",
    name: "Ramsey Bolton",
  },

  {
    citation:
      "Quand il s'agit de guerre je me bats pour Dorne, quand il s'agit d'amour je ne choisis pas mon camp.",
    name: "Oberyn Martell",
  },
];

function indexGenerator(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

axios
  .get("https://thronesapi.com/api/V2/Characters") //on chercher la data API
  .then((myDataApi) => {
    //une fois requete faite, on nomme la reponse myDataApi
    const myDataApiCharactersQuotesArray = myDataApi.data //on prend data dans myDataApi (data = array de pers)
      .filter((char) => {
        //extrait uniquement les perso presents dans mon array d'origine
        return myCharactersQuotes.some((myChar) => {
          //on cherche dans mon array si un perso a le meme nom que celui de l'api de la boucle filter
          return myChar.name === char.fullName;
        });
      })
      .map((char) => {
        //on retraite le tableau filtre en le mapant pour retourner un nouveau array avec perso + citation de mon tableau

        const character = myCharactersQuotes.find((myCharacter) => {
          //je cherche dans mon array le personnage dont le nom est le meme que le perso courrant de la boucle map
          return myCharacter.name === char.fullName;
        });

        if (character) {
          //si jai un perso, je return un nouvel objet qui fusionne la data de l'api + ma citation
          return {
            ...char,
            citation: character.citation,
          };
        }

        return char; //sinon juste le perso de l'api
      });
    console.log(myDataApiCharactersQuotesArray);

    let buttonGenerator = document.querySelector("#buttonGenerator");
    let citationDisplay = document.querySelector("#citation");
    let authorDisplay = document.querySelector("#author");
    let pictureContainer = document.querySelector("#pictureContainer");
    let lastCitation = 0;
    let randomIndex;

    const changeCitation = function () {
      do {
        randomIndex = indexGenerator(myDataApiCharactersQuotesArray.length);
      } while (randomIndex === lastCitation);

      console.log(myDataApiCharactersQuotesArray[randomIndex]);

      citationDisplay.textContent =
        myDataApiCharactersQuotesArray[randomIndex].citation || "Bonjour"; //si citation undefined => Bonjour;
      authorDisplay.textContent =
        myDataApiCharactersQuotesArray[randomIndex].fullName;
      // pictureDisplay.src = myDataApiCharactersQuotesArray[randomIndex].imageUrl;
      let pictureDisplay = document.querySelector("#pictureChar");
      pictureDisplay.remove();
      const newPicture = document.createElement("img");
      newPicture.id = "pictureChar";
      newPicture.setAttribute("loading", "lazy");
      newPicture.src = myDataApiCharactersQuotesArray[randomIndex].imageUrl;
      pictureContainer.append(newPicture);
      lastCitation = randomIndex;
    };

    buttonGenerator.addEventListener("click", changeCitation);
  });
