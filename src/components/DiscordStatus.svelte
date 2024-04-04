<script lang="ts">
    import '../../node_modules/@flaticon/flaticon-uicons/css/all/all.css';
    import moment from 'moment';
    import 'moment-timezone';

    window.moment = moment;
    import {Avatar, Indicator} from 'flowbite-svelte';
    import {onMount} from "svelte";
    import axios from "axios";

    const DISCORD_ID = `165584933149081600`;
    const MY_TIMEZONE = "Europe/London";

    let error = false;
    let discordData = null;
    let discordColor = `transparent`

    const discordRequest = async () => {
        try {
            const request = await axios.get(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
            const response = request.data;

            const {data} = response;

            discordData = data;

            discordColor = data.discord_status === "online"
                ? "green"
                : data.discord_status === "dnd"
                    ? "red"
                    : data.discord_status === "idle"
                        ? "yellow"
                        : "transparent"

        } catch (e) {
            error = true;
        }
    }

    onMount(() => {
        discordRequest();
        const interval = setInterval(async () => discordRequest(), 60000);
        return async () => {
            clearInterval(interval);
        };
    });


    let hourAheadBehindLabel = null;
    let currentTime = null;

    onMount(() => {
        var now = moment();
        var localOffset = now.utcOffset();
        now.tz(MY_TIMEZONE); // your time zone, not necessarily the server's
        var centralOffset = now.utcOffset();
        var diffInMinutes = localOffset - centralOffset;
        let hourAheadBehind = diffInMinutes / 60;
        if (hourAheadBehind > 0) {
            hourAheadBehindLabel = `${Math.abs(hourAheadBehind)}h behind`
        } else if (hourAheadBehind < 0) {
            hourAheadBehindLabel = `${Math.abs(hourAheadBehind)}h ahead`
        } else if (hourAheadBehind > 0 && hourAheadBehind < 1) {
            hourAheadBehindLabel = `${Math.abs(hourAheadBehind) * 60}m behind`;
        } else if (hourAheadBehind < 0 && hourAheadBehind > -1) {
            hourAheadBehindLabel = `${Math.abs(hourAheadBehind) * 60}m ahead`;
        }
        currentTime = now.format('LTS');
        const interval = setInterval(() => {
            var now = moment();
            var localOffset = now.utcOffset();
            now.tz(MY_TIMEZONE); // your time zone, not necessarily the server's
            var centralOffset = now.utcOffset();
            var diffInMinutes = localOffset - centralOffset;
            let hourAheadBehind = diffInMinutes / 60;
            if (hourAheadBehind > 0) {
                hourAheadBehindLabel = `${Math.abs(hourAheadBehind)}h behind`
            } else if (hourAheadBehind < 0) {
                hourAheadBehindLabel = `${Math.abs(hourAheadBehind)}h ahead`
            } else if (hourAheadBehind > 0 && hourAheadBehind < 1) {
                hourAheadBehindLabel = `${Math.abs(hourAheadBehind) * 60}m behind`;
            } else if (hourAheadBehind < 0 && hourAheadBehind > -1) {
                hourAheadBehindLabel = `${Math.abs(hourAheadBehind) * 60}m ahead`;
            }
            currentTime = now.format('LTS');
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    function constructValues(activityData) {
        const {name, state, details} = activityData;
        let _state = state.trim();
        let _details = details.trim();
        let _name = name.trim();

        if (name.toLowerCase() == "spotify") {
            _name = `<span class="text-[#1DB954]"><i class="fi fi-brands-spotify"></i></span>`;
            _state = _state.split("; ")[0]
        }


        let values = [];

        if (_state === "") {
            _state = null;
        }
        if (_details === "") {
            _details = null;
        }

        if (_state) {
            values.push(_state);
        }
        if (_details) {
            values.push(_details);
        }

        if (values.length > 0) {
            return `${_name} | ${values.join(" - ")}`;
        }

        return _name;
    }
</script>
{#if discordData}
    <div class="flex items-center tablet:flex-col space-x-4 rtl:space-x-reverse">
        <Avatar src="https://cdn.discordapp.com/avatars/{discordData?.discord_user?.id}/{discordData?.discord_user?.avatar}.png"
                dot={{ placement: 'bottom-right', color: discordColor }}
                size="none" class="w-28 h-fit"
        />
        <div class="space-y-1 font-medium w-full">
            <h1>{discordData?.discord_user?.username}</h1>
            <div class="text-sm text-primary-100 flex flex-col gap-1">
                <div class="flex tablet:flex-col gap-2">
                    {#if discordData?.discord_status !== 'online'}
                        {#if discordData?.discord_status === "dnd"}
                            Do Not Disturb
                        {:else}
                            {discordData?.discord_status[0].toUpperCase() + discordData?.discord_status?.substring(1)}
                        {/if}
                    {:else}
                        Online
                    {/if}
                    <p>The current time is {currentTime}
                        {#if hourAheadBehindLabel}<span class="text-secondary-200"> - {hourAheadBehindLabel}</span>{/if}
                    </p>
                </div>


                {#each discordData?.activities ?? [] as activityData}
                    <div class="border-t border-t-secondary-900 pt-2">
                        {@html constructValues(activityData)}
                    </div>
                {/each}
            </div>
        </div>
    </div>

{/if}