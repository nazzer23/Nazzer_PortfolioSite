<script type="ts">
  const githubProjectPromise = import("./GitHubProjects.svelte");
</script>

<section id="projects">
  <div class="flex flex-col gap-6 justify-center items-center w-full">
    <h1>my projects</h1>
    {#await githubProjectPromise then { default: GitHubProjects }}
      <GitHubProjects />
    {/await}
  </div>
</section>
