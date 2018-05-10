

-git clone https://github.com/UCDP-Brony/Projet-Mobile-V2.git

-installer android-studio:
	decompresser l'archive dans le dossier d'installation souhaité
	aller dans le dossier android-studio/bin et lancer la commande ./studio.sh
	suivre la procédure d'installation
	ajouter {install dir}/android-studio/bin dans le PATH
	

-installer nodejs.
	decompresser l'archive dans le dossier d'installation souhaité
	ajouter {install dir}/node-v8.9.4-linux-x64/bin dans le PATH

-Paths et variables d'environnement:


echo 'export PATH=$PATH:/opt/node-v8.9.4-linux-x64/bin' >> /root/.bashrc

export PATH=$PATH:/opt/node-v8.9.4-linux-x64/bin
export ANDROID_HOME="/root/Android/Sdk"
export PATH=$PATH:/opt/android-studio/bin
export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64/"
export PATH=$JAVA_HOME/bin:$PATH




-Nettoyer npm des précédentes utilisations:
npm cache clean --force



npm install -g
npm install -g cordova ionic

Correctif:
node_modules/angularfire2/firebase.app.module.d.ts
line 19, add :
cc


apt-get install gradle

-Build
ionic cordova run android -- -- --gradleArg=--stacktrace


