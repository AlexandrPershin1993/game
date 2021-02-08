const path = require('path');

function renameManifestFileName(FileDescriptor) {
    const {name} = FileDescriptor;
    const fileDividedPath = name.split('/');
    const fileName = fileDividedPath[fileDividedPath.length - 1];
    return {...FileDescriptor, name: fileName}
}

function getGamesNames(gamesPaths) {
    return gamesPaths.map(gamePath => {
        const gameDividedPath = gamePath.split('/');
        return gameDividedPath[gameDividedPath.length - 1];
    })
}

function getEntries(gamesPaths, gamesNames) {
    return gamesPaths.reduce((entries, gamePath, index) => {
         entries[gamesNames[index]] = `${gamePath}/main.js`;
         return entries;
    }, {})
}

function getAssets(gamesNames) {
    return gamesNames.map(name => (
        {
            context: "src",
            from: `games/${name}/resources`,
            to: `${name}/resources/[path][name].[hash].[ext]`
        }
    ))
}

module.exports = {
    renameManifestFileName,
    getGamesNames,
    getEntries,
    getAssets
}