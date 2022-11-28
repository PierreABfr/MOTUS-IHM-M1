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
 * Vérifie l'existance d'un mot dans
 * Entrée : (String) Mot
 * Sortie : (boolean) true si présent, sinon false
 */
function verifierExistanceMot(mot){
    return dictionnaire.includes(mot.toUpperCase());
}

/**
 * fonction differencesMots
 * Renvoie la comparaison de deux mots
 * Entrée : (String) Mot secret
 * Entrée : (String) Mot proposé
 * Sortie : (Array(int)) Résultat de la comparaison
 *
 * Exemple:
 * -> Bonjour, Bavards
 * <- [2, 0, 0, 0, 1, 0, 0]
 * Avec: 2 -> Bien placé
 *       1 -> Présent, mais mal placé
 *       0 -> Non présent
 */
function differencesMots(motSecret, motPropose){
    var resultat = Array(motSecret.length);
    for (var i = 0 ; i < motSecret.length ; i++){
        if(motSecret[i] == motPropose[i]){
            resultat[i] = 2;
        }else if(motSecret.includes(motPropose[i])){
            resultat[i] = 1;
        }else{
            resultat[i] = 0;
        }
    }
    return resultat;
}

/**
 * fonction validerMot
 * Vérifie la validité du mot proposé
 * Entrée : (String) Mot secret
 * Entrée : (String) Mot proposé
 */
function validerMot(motSecret, motPropose){

}


/**
 * fonction deboggage
 * Permet de tester les fonctions
 */
function deboggage(){
    //Test obtenirMotAleatoire
    console.log("Récupération de 10 mots aléatoires:")
    var motAleatoire = Array(10);
    for (var i = 0 ; i < 10 ; i++){
        motAleatoire[i] = obtenirMotAleatoire();
    }
    console.log(motAleatoire);

    //Test verifierExistanceMot
    var listeTest = Array("Orange","Mettre","Paix","UBO","aaaaaaa","Bateau");
    var resultatsAttendus = Array(true,true,true,false,false,true);
    var resultatsCorrespondants = true;

    for (var i = 0 ; i < listeTest.length ; i++){
        if(verifierExistanceMot(listeTest[i]) != resultatsAttendus[i]){
            resultatsCorrespondants = false;
        }
    }
    console.log("Résultat du test : "+(resultatsCorrespondants?"Positif":"Négatif") )
}

/**
 * fonction init
 * Initialisation du site pour les chargements
 */
function init(){
    //Chargement du dictionnaire
    var fichier = new XMLHttpRequest();
    //Dictionnaire "Officiel Du Scrabble V6"
    fichier.open("GET", "/assets/ods6.txt", true);
    fichier.onreadystatechange = function () {
        if(fichier.readyState === 4) {
            if(fichier.status === 200 || fichier.status == 0) {
                var texteBrut = fichier.responseText;
                dictionnaire = texteBrut.replaceAll("\r","").split("\n");
            }
        }
    }
    fichier.send(null);
}
init()