<script>
    export let repoObject;

    let repoName = repoObject?.name;

</script>

<div class="card hover:bg-gradient-to-b hover:from-primary-500 hover:to-primary-50">
    <div class="card-header">
        <div class="flex flex-row gap-1">
            <h2>{repoName}</h2>
        </div>
        {#if repoObject?.language}
            <small class="repo-language">{repoObject?.language}</small>
        {/if}
    </div>

    {#if (repoObject?.description)}
        <div class="card-body">
            <p>{repoObject?.description}</p>
        </div>
    {/if}

    <div class="card-footer">
        {#if (repoObject?.pushed_at)}
            <small>Last Updated on {new Date(repoObject?.pushed_at).toLocaleDateString()}</small>
        {/if}

        {#if (repoObject?.created_at)}
            <small>Created on {new Date(repoObject?.created_at).toLocaleDateString()}</small>
        {/if}
    </div>
</div>