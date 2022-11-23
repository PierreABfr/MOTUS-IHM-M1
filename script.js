
/**
 * fonction obtenirMotAleatoire
 * Remplace le contenu de l'élément par un mot aléatoire
 * Entrée: (DOM élément) element
 */
function obtenirMotAleatoire(element){
    if (element == null) return;
    var fichier = new XMLHttpRequest();
    fichier.open("GET", "/assets/ods6.txt", true);
    fichier.onreadystatechange = function () {
        if(fichier.readyState === 4) {
            if(fichier.status === 200 || fichier.status == 0) {
                var texteBrut = fichier.responseText;
                var motsAleatoires = texteBrut.split("\n");
                var variabletoire = Math.floor(Math.random() * motsAleatoires.length);
                //console.log(motsAleatoires[variabletoire])
                document.getElementById("motCache").innerText = motsAleatoires[variabletoire]
            }
        }
    }
    fichier.send(null);
}

/**
 * fonction verifierExistanceMot
 * Entrée : (String) Mot
 * Sortie : (boolean) true si présent, sinon false
 */
function verifierExistanceMot(mot){

}

function main(){
    console.log("obtenirMotAleatoire")
    obtenirMotAleatoire("motCache");
}
main()