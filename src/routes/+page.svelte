<script lang="ts">
	export let data;
	console.log(data.data);
</script>

<svelte:head>
	<title>Github Scraping</title>
	<meta name="Webscraping" content="svelte webscraping" />
</svelte:head>

<section>
	<h1>Github Contributions</h1>
	<table>
		{#each data.data as row}
			<tr>
				{#each row as day}
					<td data-level={day?.level} />
				{/each}
			</tr>{/each}
	</table>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
    color: white;
	}

	td {
		padding: 0.4rem;
		border-radius: 2px;
    &[data-level="0"] {
      background-color: #2c333b;
    }
    &[data-level="1"] {
      background-color: #00442a;
    }
    &[data-level="2"] {
      background-color: #006d35;
    }
    &[data-level="3"] {
      background-color: #00a648; 
    }
    &[data-level="4"] {
      background-color: #00d35c;
    }
  }
</style>
