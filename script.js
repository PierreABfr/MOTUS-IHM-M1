
/**
 * fonction obtenirMotAleatoire
 * Sortie : (String) Mot
 */
function obtenirMotAleatoire(){
    var fichier = new XMLHttpRequest();
    fichier.open("GET", "/assets/ods6.txt", true);
    fichier.onreadystatechange = function () {
        if(fichier.readyState === 4) {
            if(fichier.status === 200 || fichier.status == 0) {
                var texteBrut = fichier.responseText;
                var motsAleatoires = texteBrut.split("\n");
                var variabletoire = Math.floor(Math.random() * motsAleatoires.length);
                //console.log(motsAleatoires[variabletoire])
                return motsAleatoires[variabletoire]
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
    console.log("Mot aléatoire:")
    var motAleatoire = obtenirMotAleatoire();
    console.log(motAleatoire);
}
main()