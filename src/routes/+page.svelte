<script lang="ts">
  import { onMount } from "svelte";
  import Counter from "./Counter.svelte";

  onMount(async () => {
    try {
      const response = await fetch(
        "https://github.com/users/mattcroat/contributions?from=2022-12-01&to=2022-12-31"
      );
      if (response.ok) {
        // You can handle the response here
        const data = await response.json();
        console.log(data);
      } else {
        console.error(
          "Failed to fetch data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
</script>

<svelte:head>
  <title>Github Scraping</title>
  <meta name="Webscraping" content="svelte webscraping" />
</svelte:head>

<section>
  <h1>Github Conributions</h1>
  <Counter />
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
  }

</style>
