import { describe, expect, it } from "vitest";
import {
  classifyHiaiUiPin,
  isAllowedHiaiUiPin,
  isPortableHiaiUiPin,
} from "../lib/pins.js";

describe("classifyHiaiUiPin", () => {
  it("treats an exact npm version as portable", () => {
    expect(classifyHiaiUiPin("0.1.3")).toBe("npm-exact");
    expect(isAllowedHiaiUiPin("0.1.3")).toBe(true);
    expect(isPortableHiaiUiPin("0.1.3")).toBe(true);
  });

  it("treats the hiai-admin/hiai-post npm alias as portable", () => {
    expect(classifyHiaiUiPin("npm:@hiai-gg/hiai-ui@0.1.3")).toBe("npm-alias-exact");
    expect(isAllowedHiaiUiPin("npm:@hiai-gg/hiai-ui@0.1.3")).toBe(true);
    expect(isPortableHiaiUiPin("npm:@hiai-gg/hiai-ui@0.1.3")).toBe(true);
  });

  it("rejects caret and other floating npm ranges", () => {
    expect(classifyHiaiUiPin("^0.1.1")).toBe("forbidden-float");
    expect(classifyHiaiUiPin("^0.1.3")).toBe("forbidden-float");
    expect(classifyHiaiUiPin("~0.1.3")).toBe("forbidden-float");
    expect(classifyHiaiUiPin("latest")).toBe("forbidden-float");
    expect(classifyHiaiUiPin("workspace:*")).toBe("forbidden-float");
    expect(isAllowedHiaiUiPin("^0.1.1")).toBe(false);
    expect(isPortableHiaiUiPin("^0.1.1")).toBe(false);
  });

  it("allows sibling file: as a non-portable dev pin", () => {
    expect(classifyHiaiUiPin("file:../hiai-ui")).toBe("dev-file");
    expect(isAllowedHiaiUiPin("file:../hiai-ui")).toBe(true);
    expect(isPortableHiaiUiPin("file:../hiai-ui")).toBe(false);
  });

  it("allows a full GitHub SHA and a v* tag, rejects #main", () => {
    const sha = "a597926fe63c5b49d0b464a2c04f655bf31c79f5";
    expect(classifyHiaiUiPin(`github:HiAi-gg/hiai-ui#${sha}`)).toBe("immutable-sha");
    expect(classifyHiaiUiPin("github:HiAi-gg/hiai-ui#v0.1.3")).toBe("release-tag");
    expect(classifyHiaiUiPin("github:HiAi-gg/hiai-ui#main")).toBe("forbidden-float");
    expect(isPortableHiaiUiPin(`github:HiAi-gg/hiai-ui#${sha}`)).toBe(true);
    expect(isPortableHiaiUiPin("github:HiAi-gg/hiai-ui#v0.1.3")).toBe(true);
    expect(isAllowedHiaiUiPin("github:HiAi-gg/hiai-ui#main")).toBe(false);
  });
});
