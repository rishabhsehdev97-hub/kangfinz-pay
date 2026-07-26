import { encryptedStorage } from "./encryptedStorage";

const SESSION_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes inactivity timeout

export class SessionManager {
  private lastActive: number = Date.now();
  private timer: any = null;

  constructor(private onTimeout: () => void) {
    this.initListeners();
  }

  private initListeners() {
    const reset = () => this.touchSession();
    window.addEventListener("mousemove", reset);
    window.addEventListener("keydown", reset);
    window.addEventListener("touchstart", reset);
    window.addEventListener("click", reset);
  }

  public touchSession() {
    this.lastActive = Date.now();
    encryptedStorage.setItem("last_active_time", this.lastActive);
  }

  public isSessionExpired(): boolean {
    const savedTime = encryptedStorage.getItem<number>("last_active_time", Date.now());
    return Date.now() - savedTime > SESSION_TIMEOUT_MS;
  }

  public start() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.isSessionExpired()) {
        this.onTimeout();
      }
    }, 15000);
  }

  public stop() {
    if (this.timer) clearInterval(this.timer);
  }
}
