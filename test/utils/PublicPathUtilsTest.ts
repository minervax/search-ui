import { DomUtils } from '../../src/utils/DomUtils';
import { PublicPathUtils } from '../../src/utils/PublicPathUtils';

export function PublicPathUtilsTest() {
  describe('PublicPathUtils', () => {
    let currentScript;
    const detectedPath = 'some/path/';
    const configuredPath = 'path';

    const fakeScript = <HTMLScriptElement>{ src: `${detectedPath}script.js` };

    beforeEach(() => {
      currentScript = DomUtils.getCurrentScript;
      PublicPathUtils.reset();
      DomUtils.getCurrentScript = () => fakeScript;
    });

    afterEach(() => {
      DomUtils.getCurrentScript = currentScript;
    });

    it('should set webpack public path when configuring ressource root', () => {
      PublicPathUtils.configureRessourceRoot(configuredPath);
      expect(__webpack_public_path__).toBe(configuredPath);
    });

    it('should get the ressource root', () => {
      const result = PublicPathUtils.getDynamicPublicPath();
      expect(result).toBe(detectedPath);
    });

    it('should get the ressource root with a hash value', () => {
      let fakeScriptWithHashValue = <HTMLScriptElement>{ src: `${detectedPath}script.js#some=value&other=value` };
      DomUtils.getCurrentScript = () => fakeScriptWithHashValue;

      const result = PublicPathUtils.getDynamicPublicPath();

      expect(result).toBe(detectedPath);
    });

    it('should get the public path from the ressource root with a url parameter', () => {
      const fakeScriptWithUrlParam = <HTMLScriptElement>{ src: `${detectedPath}script.js?someParam=1&otherParam=2` };
      DomUtils.getCurrentScript = () => fakeScriptWithUrlParam;

      const result = PublicPathUtils.getDynamicPublicPath();

      expect(result).toBe(detectedPath);
    });

    it('should set webpack public path to the detected ressource root', () => {
      PublicPathUtils.detectPublicPath();
      expect(__webpack_public_path__).toBe(detectedPath);
    });

    it('should use the manually configured path even after detecting the path', () => {
      PublicPathUtils.configureRessourceRoot(configuredPath);
      PublicPathUtils.detectPublicPath();

      expect(__webpack_public_path__).toBe(configuredPath);
    });

    it('should detect the script after reseting the configured state', () => {
      PublicPathUtils.configureRessourceRoot(configuredPath);
      PublicPathUtils.reset();
      PublicPathUtils.detectPublicPath();

      expect(__webpack_public_path__).toBe(detectedPath);
    });
  });
};
