function renameManifestFileName(FileDescriptor) {
    const {name} = FileDescriptor;
    const fileDividedPath = name.split('/');
    const fileName = fileDividedPath[fileDividedPath.length - 1];
    return {...FileDescriptor, name: fileName}
}

module.exports = {
    renameManifestFileName
}