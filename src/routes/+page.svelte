<script lang="ts">
  import { isTauri } from "@tauri-apps/api/core";
  import { Timer } from "../domain/timer";
  import { getRate, updateRate } from "../application/providers";
  import { rateFactorty } from "../domain/rate/rate_factory";

  let time = 0;
  let interval: number | null = null;
  let ratePerHour = 0;
  let buttonDisabled = false;
  let rateStrategy:
    | "half_hour_per_quarter"
    | "two_students_per_hour-hour"
    | "hourly"
    | "first_hour_free";

  getRate.execute().then((rate) => {
    ratePerHour = rate;
  });

  let value = 0;
  let mode = isTauri() ? "desktop" : "web";

  const timer = new Timer();

  function onStrategyChange(e: Event) {
    rateStrategy = (e.target as HTMLSelectElement).value as
      | "half_hour_per_quarter"
      | "two_students_per_hour-hour"
      | "hourly"
      | "first_hour_free";
  }

  function start() {
    if (interval) return;

    timer.start();
    interval = setInterval(() => {
      buttonDisabled = true;
      time = timer.getTime();

      value = rateFactorty(rateStrategy).calculateValue(time, ratePerHour);
    }, 200);
  }

  function pause() {
    timer.pause();
    clearInterval(interval!);
    interval = null;
  }

  function reset() {
    pause();
    buttonDisabled = false;
    timer.reset();
    console.log("timer: ", timer.getTime());
    time = timer.getTime();
  }

  function format(ms: number) {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  }

  function onRateChange(e: Event) {
    const value = parseFloat((e.target as HTMLInputElement).value);
    ratePerHour = isNaN(value) ? 0 : value;

    updateRate.execute(ratePerHour);
  }
</script>

<main class="container">
  <section class="card timer">
    <h1 class="time">{format(time)}</h1>
    <h2>Modo {mode}</h2>
    <div class="actions">
      <button class="primary" on:click={start}>Iniciar</button>
      <button on:click={pause}>Pausar</button>
      <button class="danger" on:click={reset}>Reset</button>
    </div>
  </section>

  <section class="sidebar">
    <article class="rate">
      <div class="rate-row">
        <label class="rate-input">
          <span>Precio por hora</span>
          <input
            disabled={buttonDisabled}
            type="number"
            min="0"
            step="0.01"
            value={ratePerHour}
            on:input={onRateChange}
          />
          <p class="hint">$ {ratePerHour.toFixed(2)} / h</p>
        </label>

        <label class="rate-strategy">
          <span>Modo de cobro</span>
          <select
            on:change={onStrategyChange}
            bind:value={rateStrategy}
            disabled={buttonDisabled}
          >
            <option value="half_hour_per_quarter">½ hora + 15 min</option>
            <option value="two_students_per_hour">2x1 alumnos al 75%</option>
            <option value="first_hour_free">Primera hora gratis</option>
            <option value="hourly">Por hora exacta</option>
          </select>
        </label>
      </div>
    </article>

    <article class="card">
      <p class="value">
        Valor acumulado: <strong>$ {value.toFixed(2)}</strong>
      </p>
    </article>
  </section>
</main>

<style>
  :root {
    --primary: #6200ee;
    --primary-light: #7f39fb;
    --surface: #ffffff;
    --background: #f5f5f7;
    --text: #1c1c1e;
    --danger: #b00020;
    --radius: 14px;
    --shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  main.container {
    height: 100vh;
    display: grid;
    place-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "timer sidebar";

    background: var(--background);
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      sans-serif;
    color: var(--text);
  }

  .timer {
    grid-area: timer;
  }

  .sidebar {
    grid-area: sidebar;
  }

  .card {
    background: var(--surface);
    padding: 2.5rem 3rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    text-align: center;
    min-width: 320px;
  }

  .time {
    font-size: 3.2rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    margin-bottom: 2rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  button {
    border: none;
    padding: 0.7rem 1.4rem;
    border-radius: 999px;
    background: #e0e0e0;
    color: #333;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  button:hover {
    background: #d5d5d5;
  }

  button.primary {
    background: var(--primary);
    color: white;
  }

  button.primary:hover {
    background: var(--primary-light);
  }

  button.danger {
    background: transparent;
    color: var(--danger);
  }

  button.danger:hover {
    background: rgba(176, 0, 32, 0.08);
  }

  .rate-row {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
  }

  .rate {
    margin-top: 2rem;
    text-align: left;
  }

  .rate label {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .rate span {
    font-size: 0.75rem;
    color: #666;
  }

  .rate input,
  select {
    border: none;
    border-bottom: 2px solid #ccc;
    padding: 0.4rem 0;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.15s;
  }

  .rate input:focus,
  .rate select:focus {
    border-color: var(--primary);
  }

  .hint {
    margin-top: 0.4rem;
    font-size: 0.8rem;
    color: #888;
  }

  .rate {
    margin-top: 2rem;
    text-align: left;
  }

  .rate label {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .rate span {
    font-size: 0.75rem;
    color: #666;
  }

  .rate input {
    border: none;
    border-bottom: 2px solid #ccc;
    padding: 0.4rem 0;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.15s;
  }

  .rate input:focus {
    border-color: var(--primary);
  }

  .hint {
    margin-top: 0.4rem;
    font-size: 0.8rem;
    color: #888;
  }

  @media (min-width: 600px) {
    main.container {
      grid-template-columns: 1fr;
      grid-template-areas:
        "sidebar"
        "timer";
    }
  }
</style>
