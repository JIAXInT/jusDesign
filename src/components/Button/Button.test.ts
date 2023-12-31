import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "./Button.vue";

describe("Button.vue", () => {
  test("basic button", () => {
    const wrapper = mount(Button, {
      props: {
        type: "primary",
      },
      slots: {
        default: "button",
      },
    });

    console.log(wrapper.html()); //打印出HTML节点
    expect(wrapper.classes()).toContain("j-button--primary"); //断言类名是否包含primary
    expect(wrapper.get("button").text()).toBe("button"); //断言文本是否为button
    //events
    wrapper.get("button").trigger("click");
    console.log(wrapper.emitted());
    expect(wrapper.emitted()).toHaveProperty("click");
  });

  test("disable", () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
      slots: {
        default: "disabled",
      },
    });
    expect(wrapper.attributes("disabled")).toBeDefined();
  });
});
