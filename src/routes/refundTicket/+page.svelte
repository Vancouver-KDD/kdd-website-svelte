<script lang="ts">
  import {page} from '$app/stores'
  import {Toaster, toast} from 'svelte-french-toast'
  import Card, {Content, PrimaryAction, Media, MediaContent} from '@smui/card'
  import {fetchTicket} from '$lib/actions/firebase-action'

  let reservedTicket: DB.Ticket

  const ticketId = $page.url.searchParams.get('ticketId') ?? ''
  fetchTicket(ticketId).then((data) => {
    reservedTicket = data as DB.Ticket
  })
</script>

<svelte:head>
  <title>Vancouver KDD - MyTicket</title>
</svelte:head>

<Toaster />

<section class="flex-center flex-col">
  <div class="max-w-4xl w-full flex flex-col md:flex-row gap-8">
    <div class="card-display shadow-lg">
      <div class="card-container">
        <Card>
          <Media class="card-media-16x9" aspectRatio="16x9">
            <MediaContent>
              <h2
                class="mdc-typography--headline6"
                style="color: #fff; position: absolute; bottom: 16px; left: 16px; margin: 0;">
                A card with 16x9 media.
              </h2>
            </MediaContent>
          </Media>
          <Content style="color: #888;"></Content>
        </Card>
      </div>

      <div class="card-container">
        <Card style="min-width: 300px;">
          <Media class="card-media-square" aspectRatio="square">
            <div style="color: #fff; position: absolute; bottom: 16px; left: 16px;">
              <h2 class="mdc-typography--headline6" style="margin: 0;">
                A card with square media.
              </h2>
              <h3 class="mdc-typography--subtitle2" style="margin: 0;">And a subtitle.</h3>
            </div>
          </Media>
        </Card>
      </div>

      <div class="card-container">
        <Card>
          <div style="padding: 1rem;">
            <h2 class="mdc-typography--headline6" style="margin: 0;">A card with media.</h2>
            <h3 class="mdc-typography--subtitle2" style="margin: 0; color: #888;">
              And a subtitle.
            </h3>
          </div>
          <PrimaryAction on:click={() => clicked++}>
            <Media class="card-media-16x9" aspectRatio="16x9" />
            <Content class="mdc-typography--body2">
              And some info text. And the media and info text are a primary action for the card.
            </Content>
          </PrimaryAction>
        </Card>
      </div>
    </div>
  </div>
  <div class="mt-24 mb-4">
    <p class="text-xs md:text-sm">
      ** This information is solely for reserving KDD's open events and will not be used for any
      other purpose.
    </p>
  </div>
</section>

<style>
  * :global(.card-media-16x9) {
    background-image: url(https://placehold.co/320x180?text=16x9);
  }

  * :global(.card-media-square) {
    background-image: url(https://placehold.co/320x320?text=square);
  }
</style>
