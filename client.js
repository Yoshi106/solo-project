const emoji = ["a", "b", "c"];
emoji.forEach(emoji => {
    const el = document.createElement('dev');
    el.innerHTML = emoji;
    document.body.appendChild(el);
})