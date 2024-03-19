<script>
    function handleAnchorClick (event) {
        event.preventDefault()
        const link = event.currentTarget
        const anchorId = new URL(link.href).hash.replace('#', '')
        const anchor = document.getElementById(anchorId)
        window.scrollTo({
            top: anchor.offsetTop - 60,
            behavior: 'smooth'
        })
    }
</script>


<header class="header">
    <div class="links">
        <a href="#intro" on:click={handleAnchorClick}>/</a>
        <a href="#about" on:click={handleAnchorClick}>about me</a>
        <a href="#projects" on:click={handleAnchorClick}>projects</a>
    </div>
</header>