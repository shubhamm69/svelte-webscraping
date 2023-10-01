<script lang="ts">
	import type { ActionData } from './$types.js';
	export let form: ActionData | null = null;
	console.log(form);
	let { name = '', year = '' } = form?.parseData || {};
	let errorArray: any[] = form?.error ? JSON.parse(form.error) : [];
	function findError(path: string): any | undefined {
		return errorArray.find((issue) => issue.path[0] === path);
	}
	let nameError = findError('name');
	let yearError = findError('year');
</script>

<svelte:head>
	<title>Github Scraping</title>
	<meta name="Webscraping" content="svelte webscraping" />
</svelte:head>

<section class="flex flex-col justify-center items-center w-full mt-12">
	<h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Github Contributions</h1>
	<form class="w-1/2" method="POST">
		<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Username</label
		>
		<div class="flex mb-4">
			<span
				class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
			>
				<svg
					class="w-4 h-4 text-gray-500 dark:text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
					></path>
				</svg>
			</span>
			<input
				name="name"
				type="text"
				bind:value={name}
				class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="@github-username"
				required
			/>
			{#if nameError}
				<p class="text-red-500 mb-2 text-sm">Please select a valid name</p>
			{/if}
		</div>
		<div class="mb-4">
			<label for="year" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Select Year</label
			>
			<select
				name="year"
				bind:value={year}
				required
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option selected>Select Year</option>
				{#each [2023, 2022, 2021, 2020, 2019] as option}
					<option value={option}>{option}</option>
				{/each}
			</select>
			{#if yearError}
				<p class="text-red-500 mb-2 text-sm">Please select a valid year</p>
			{/if}
		</div>

		<div class="my-8">
			<button
				class="w-full bg-green-500 text-gray-50 hover:bg-green-600 transition duration-200 dark:bg-green-600 dark:hover:bg-green-500"
				type="submit">Submit</button
			>
		</div>
	</form>
	<section class="flex justify-center items-center w-full mt-12">
		<table class="w-full max-w-4xl mx-auto">
			{#if form != null}
				{#each form.data as row}
					<tr>
						{#each row as day}
							<td class="p-2 border-2 border-black rounded" data-level={day?.level} />
						{/each}
					</tr>
				{/each}
			{/if}
		</table>
	</section>
</section>

<style>
	td {
		padding: 10px;
		border-radius: 1px;
		&[data-level='0'] {
			background-color: #2c333b;
		}
		&[data-level='1'] {
			background-color: #00442a;
		}
		&[data-level='2'] {
			background-color: #006d35;
		}
		&[data-level='3'] {
			background-color: #00a648;
		}
		&[data-level='4'] {
			background-color: #00d35c;
		}
	}
</style>
