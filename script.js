// Dictionnaire contenant les mots acceptés
// Initialisé dans la fonction "init"
var dictionnaire;
// Mot caché actuel
var motCache;
// Ligne active actuelle
var ligneActuelle;

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
function differencesMots(motPropose){
    var resultat = Array(motCache.length);
    for (var i = 0 ; i < motCache.length ; i++){
        if(motCache[i].toUpperCase() == motPropose[i].toUpperCase()){
            resultat[i] = 2;
        }else if(motCache.includes(motPropose[i].toUpperCase())){
            resultat[i] = 1;
        }else{
            resultat[i] = 0;
        }
    }
    // pour les mal placés, on doit vérifier si
    // le nombre est bien respecté TODO
    for(var i = 0 ; i < motCache.length ; i++){
        // TODO TODO TODO TODO
    }

    return resultat;
}

/**
 * fonction reinitialiserJeu
 * Remet tout les parametres à 0
 */
function reinitialiserJeu(){

}

/**
 * fonction validerMot
 * Vérifie la validité du mot proposé
 */
function validerMot(){
    var motPropose = "";
    for (var i = 1 ; i < motCache.length+1 ; i++) {
        motPropose += document.getElementById("champProposition"+i).value;
    }
    if (motPropose.length != motCache.length) {
        //Cas d'erreur TODO
        console.log("longeur");
        return;
    }
    if(!verifierExistanceMot(motPropose.toUpperCase())){
        //Mot innexistant TODO
        console.log("inconnu");
        return;
    }
    //Comparaison du mot
    var resComparaison = differencesMots(motPropose);
    for (var i = 0 ; i < motCache.length ; i++) {
        var idCaseActuelle = "grilleMotus"+ligneActuelle+"_"+(i+1)
        var caseActuelle = document.getElementById(idCaseActuelle);
        caseActuelle.innerText = motPropose.charAt(i);
        switch (resComparaison[i]){
            case 0:
                //non présent
                caseActuelle.style.backgroundColor = "blueviolet"
                break;
            case 1:
                //présent, mal placé
                caseActuelle.style.backgroundColor = "orange"
                break;
            case 2:
                //bien placé
                caseActuelle.style.backgroundColor = "green"
                break;
            default:
                //ERREUR TODO
                break;
        }
    }
    //préparation ligne suivante
    ligneActuelle++;
    if( document.getElementById("grilleMotus"+ligneActuelle) == undefined){
        //FIN, Perdu TODO
        return;
    }
    for( var i = 0 ; i < ligneActuelle - 1 ; i++){
        for( var j = 0 ; j < motCache.length ; j++){
            var majCase = document.getElementById("grilleMotus"+ligneActuelle+"_"+(j+1));
            var caseVisee = document.getElementById("grilleMotus"+(i+1)+"_"+(j+1));
            if( i == 0 ){
                majCase.innerText = ".";
            }
            if(caseVisee.style.backgroundColor == "green"){
                majCase.innerText = caseVisee.innerText;
            }
        }
    }



}

/**
 * fonction demarrerJeu
 * Demarre le jeu
 */
function demarrerJeu(){
    var longeurMot = 6;
    do{
        motCache = obtenirMotAleatoire();
    }while(motCache.length != 6);
    ligneActuelle = 1;
    var ligneSelection = document.getElementById("grilleMotus1")
    ligneSelection.children[0].innerText = motCache[0];
    for (var i = 1 ; i < longeurMot ; i++) {
        ligneSelection.children[i].innerText = ".";
    }
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