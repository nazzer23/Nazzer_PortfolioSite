<script>
    import {onMount} from 'svelte';
    import axios from 'axios';
    import GitHubRepository from "./GitHubRepository.svelte";

    let repositories = [];
    let error = false;

    onMount(async () => {
        try {
            const request = await axios.get('https://api.github.com/users/nazzer23/repos?sort=pushed');
            const response = request.data;
            repositories = (response);
        } catch (e) {
            error = true;
        }
    });
</script>
{#if (error === true)}
    <h2>An error occurred whilst polling GitHub for this users latest repositories.</h2>
{:else}
    <div class="github_projects">
        {#if (repositories.length <= 0)}
            <h2>The user has no public repositories</h2>
        {/if}
        {#each repositories as repoObject}
            {#if (repoObject?.html_url)}
                <a href="{repoObject?.html_url}">
                    <GitHubRepository repoObject="{repoObject}"/>
                </a>
            {:else}
                <GitHubRepository repoObject="{repoObject}"/>
            {/if}
        {/each}
    </div>
{/if}