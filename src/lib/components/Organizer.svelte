<script lang="ts">
  import SocialMediaIcon from './SocialMediaIcon.svelte'

  export let organizer: DB.Organizer
  const {
    name,
    title,
    profile,
    description,
    socialMediaType,
    socialMediaLink,
    socialMediaType2,
    socialMediaLink2,
  } = organizer
</script>

<div>
  <img class="w-full aspect-square object-cover rounded" src={profile?.url} alt="img" />
  <div class="w-full p-2">
    <div class="text-xl font-bold">{name}</div>
    <div class="font-bold">{title}</div>
    {#if description}<div>{description}</div>{/if}
    <div class="flex gap-4 p-2">
      {#if socialMediaType && socialMediaLink}
        <SocialMediaIcon {socialMediaType} href={socialMediaLink} />
      {/if}
      {#if socialMediaType2 && socialMediaLink2}
        <SocialMediaIcon socialMediaType={socialMediaType2} href={socialMediaLink2} />
      {/if}
    </div>
  </div>
</div>
