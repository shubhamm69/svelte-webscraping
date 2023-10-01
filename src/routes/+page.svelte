<script lang="ts">
	import Github from '$lib/images/Github.svelte';
	import type { ActionData } from './$types.js';
	export let form: ActionData | null = null;
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
	<h1 class="text-2xl font-semibold text-white mb-8">Github Contributions</h1>
	<form class="w-full md:w-1/2 px-4" method="POST">
		<label for="name" class="block mb-2 text-sm font-medium text-white">Username</label>
		<div class="flex mb-4">
			<span
				class="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-600 text-gray-400 border-gray-600"
			>
				<Github />
			</span>
			<input
				name="name"
				type="text"
				bind:value={name}
				class="rounded-none rounded-r-lg border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
				placeholder="@github-username"
				required
			/>
			{#if nameError}
				<p class="text-red-500 mb-2 text-sm">Please select a valid name</p>
			{/if}
		</div>
		<div class="mb-4">
			<label for="year" class="block mb-2 text-sm font-medium text-white">Select Year</label>
			<select
				name="year"
				bind:value={year}
				required
				class=" text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
				class="w-full bg-[#2dba4e] text-gray-50 hover:bg-green-600 transition duration-200"
				type="submit">Submit</button
			>
		</div>
	</form>
	<section class="flex justify-center items-center w-full mt-12">
		<table class="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
			{#if form != null}
				{#each form.data as row}
					<tr>
						{#each row as day}
							<td class="p-2 border-2 border-gray-500 rounded" data-level={day?.level} />
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
