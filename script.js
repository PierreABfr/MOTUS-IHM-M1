// Dictionnaire contenant les mots acceptés
// Initialisé dans la fonction "init"
var dictionnaire;

/**
 * fonction obtenirMotAleatoire
 * Sortie : (String) Mot
 */
function obtenirMotAleatoire(){
    var variabletoire = Math.floor(Math.random() * dictionnaire.length);
    return dictionnaire[variabletoire];
}

/**
 * fonction verifierExistanceMot
 * Entrée : (String) Mot
 * Sortie : (boolean) true si présent, sinon false
 */
function verifierExistanceMot(mot){
    return dictionnaire.contains(mot);
}

function main(){
    console.log("Mot aléatoire:")
    var motAleatoire = obtenirMotAleatoire();
    console.log(motAleatoire);
}

/**
 * fonction init
 * Initialisation du site pour les chargements
 */
function init(){
    //Chargement du dictionnaire
    var fichier = new XMLHttpRequest();
    fichier.open("GET", "/assets/ods6.txt", true);
    fichier.onreadystatechange = function () {
        if(fichier.readyState === 4) {
            if(fichier.status === 200 || fichier.status == 0) {
                var texteBrut = fichier.responseText;
                dictionnaire = texteBrut.split("\n");
            }
        }
    }
    fichier.send(null);
}
init()