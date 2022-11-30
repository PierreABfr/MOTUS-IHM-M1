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
    motCache = motCache.toUpperCase();
    motPropose = motPropose.toUpperCase();

    var jsonNbMalplace = {};

    var resultat = Array(motCache.length);
    for (var i = 0 ; i < motCache.length ; i++){
        if(motCache[i] == motPropose[i]){
            jsonNbMalplace[motPropose[i]]--
            resultat[i] = 2;
        }else if(motCache.includes(motPropose[i])){
            if(jsonNbMalplace[motPropose[i]] == undefined){
                jsonNbMalplace[motPropose[i]]--;
                resultat[i] = 1;
            }
        }else{
            resultat[i] = 0;
            jsonNbMalplace[motPropose[i]]++;
        }
    }

    return resultat;
}

/**
 * fonction reinitialiserJeu
 * Remet tout les parametres à 0
 */
function reinitialiserJeu(){
    if(document.getElementById("grilleMotus"+(ligneActuelle+1)) == null){
        //Cas ou le jeu est terminé (perdu),
        //Il n'y a pas de ligne suivante (avec les points)
        ligneActuelle--;
    }
    //Vider le tableau des propositions
    for( var i = 0 ; i < ligneActuelle ; i++){
        for( var j = 0 ; j < motCache.length ; j++){
            var caseVisee = document.getElementById("grilleMotus"+(i+1)+"_"+(j+1));
            caseVisee.style.backgroundColor = "blueviolet"
            caseVisee.innerText = "";
        }
    }
    //Vider les champs de saisie
    for( var i = 1 ; i < document.getElementById("propositionMot").children.length+1 ; i++){
        document.getElementById("champProposition"+i).value = "";
    }

    //Remettre les variables à leur état initial
    motCache = obtenirMotAleatoire();
    ligneActuelle = 1;
    document.getElementById("message").innerText = "Entrez un mot";
    document.getElementById("zoneActions").disabled = "";

    //Réinitialiser le message
    var message = document.getElementById("message")
    message.innerText = "Entrez un mot";
    message.removeAttribute("href","target");
}

/**
 * fonction validerMot
 * Vérifie la validité du mot proposé
 */
function validerMot(){
    if(document.getElementById("zoneActions").disabled == "true"){
        return; //Bouton desactivé
    }
    var motPropose = "";
    var objetMessage = document.getElementById("message");
    //lecture du mot proposé
    for (var i = 1 ; i < motCache.length+1 ; i++) {
        motPropose += document.getElementById("champProposition"+i).value;
    }
    //Vérification de la longueur
    if (motPropose.length != motCache.length) {
        objetMessage.innerText = "Le mot proposé n'est pas de la bonne longueur";
        return;
    }
    //Vérification de l'existance
    if(!verifierExistanceMot(motPropose.toUpperCase())){
        objetMessage.innerText = "Le mot proposé n'existe pas";
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
                //non présent
                caseActuelle.style.backgroundColor = "blueviolet"
                break;
        }
    }
    //préparation ligne suivante
    ligneActuelle++;

    //Vérification de la victoire
    if(resComparaison.includes(0) == false){
        //GAGNE
        objetMessage.innerHTML = "Vous avez gagné !\nLa réponse est bien "+motCache;
        objetMessage.href = "https://fr.wiktionary.org/w/index.php?search="+motCache.toLowerCase();
        objetMessage.target = "_blank";
        document.getElementById("zoneValider").disabled = "true";
        return;
    }

    //Vérification de la défaite
    if( document.getElementById("grilleMotus"+ligneActuelle) == null){
        //PERDU
        objetMessage.innerText = "Vous avez perdu !\nLa réponse est : "+motCache;
        objetMessage.href = "https://fr.wiktionary.org/w/index.php?search="+motCache.toLowerCase();
        objetMessage.target = "_blank";
        document.getElementById("zoneValider").disabled = "true";
        return;
    }

    //Préparation de la ligne suivante
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


    //Effacement des champs
    for( var i = 1 ; i < document.getElementById("propositionMot").children.length+1 ; i++){
        document.getElementById("champProposition"+i).value = "";
    }

    //Focus sur le premier champ
    document.getElementById("champProposition1").focus();

}

/**
 * fonction abandonner
 * Affiche le mot caché et arrête le jeu
 */
function abandonner(){
    document.getElementById("message").innerText = "Vous avez abandonné !\nLa réponse est : "+motCache;
    document.getElementById("zoneActions").disabled = "true";
    document.getElementById("message").href = "https://fr.wiktionary.org/w/index.php?search="+motCache.toLowerCase();
    document.getElementById("message").target = "_blank";
}

/**
 * fonction demarrerJeu
 * Demarre le jeu
 */
function demarrerJeu(){
    reinitialiserJeu();
    var page = document.getElementById("page_jeu");
    page.hidden = false;

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
    miseEnPlaceEvenements();

    //Focus et préremplissage sur le premier champ
    document.getElementById("champProposition1").focus();
    document.getElementById("champProposition1").value = motCache[0];
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
 * fonction miseEnPlaceEvenements
 * Permet de mettre en place les événements
 * par le clavier
 */
function miseEnPlaceEvenements(){
    //Quand on ajoute une lettre dans un champ
    //on passe au champ suivant (si il existe)
    nombreChamps = document.getElementById("propositionMot").children.length;
    addEventListener("keyup",function(e){
        var idChamp = e.target.id;
        //Si la touche appuyée est une lettre
        if(idChamp != "champProposition"+nombreChamps){

            if(e.key.length == 1){
                document.getElementById("champProposition"+(parseInt(idChamp.charAt(idChamp.length-1))+1)).focus();
            }
        }
        //Si la touche appuyée est la touche effacer
        if(idChamp != "champProposition1") {
            if (e.key == "Backspace") {
                document.getElementById("champProposition" + (parseInt(idChamp.charAt(idChamp.length - 1)) - 1)).focus();
            }
        }
        //Si la touche appuyée est la touche entrée
        if(e.key == "Enter"){
            validerMot();
        }
    });
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