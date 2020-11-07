function formatNumberSpace(reference) {
    if (!reference) {
        return '';
    }
    var parts = reference.match(/.{1,3}/g);
    return parts.join(' ');
}

export { formatNumberSpace };
