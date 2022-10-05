export class LayoutService {

    public static isTouchScreenEnabled(): boolean {
        try {
            document.createEvent('TouchEvent');
            return true;
        } 
        catch(e) {
            return false;
        }
    }

    public static isMobileDevice(): boolean {
        return window.innerWidth <= 768;
    }

}