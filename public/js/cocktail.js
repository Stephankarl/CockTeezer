const addLine = (clone, position) => {
    let form = document.getElementById(clone);
    let newClone = form.cloneNode([true]);
    document.getElementById(position).append(newClone);
}

