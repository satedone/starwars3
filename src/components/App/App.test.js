import { render, screen, waitFor } from "@testing-library/react";
import App from ".";
import userEvent from "@testing-library/user-event";

import * as Service from "../../services/swDataHandler";

Service.getData = jest.fn();

describe("App", () => {  
  describe("clickable items", () => {
    beforeEach(() => {
      Service.getData.mockResolvedValueOnce({ name: "" });
    });
    test("renders 'Next' button", async () => {
      render(<App />);
      const nextButton = screen.getByRole("button", { name: "Next" });

      await waitFor(() => expect(nextButton).toBeInTheDocument());
    });

    test("renders menu item 'People'", async () => {
      render(<App />);
      const peopleItem = screen.getByText("People");

      await waitFor(() => expect(peopleItem).toBeInTheDocument());
    });

    test("renders menu item 'Planets'", async () => {
      render(<App />);
      const planetsItem = screen.getByText("Planets");

      await waitFor(() => expect(planetsItem).toBeInTheDocument());
    });

    test("renders menu item 'Starships'", async () => {
      render(<App />);
      const starshipsItem = screen.getByText("Starships");

      await waitFor(() => expect(starshipsItem).toBeInTheDocument());
    });
  });

  describe("work with service", () => {
    test("calls getData with arguments 1 and 'people' at the start", async () => {
      Service.getData.mockResolvedValueOnce({ name: "" });
      render(<App />);

      await waitFor(() =>
        expect(Service.getData).toHaveBeenCalledWith(1, "people")
      );
      expect(Service.getData).toHaveBeenCalledTimes(1);
    });

    test("calls getData with arguments 2 and 'people' after click on Next button", async () => {
      const serviceMock = Service.getData
        .mockResolvedValueOnce({ name: "" })
        .mockResolvedValueOnce({ name: "" });
      const user = userEvent.setup();
      render(<App />);
      const nextButton = screen.getByRole("button", { name: "Next" });

      await user.click(nextButton);

      await waitFor(() => expect(Service.getData).toHaveBeenCalledTimes(2));
      await waitFor(() =>
        expect(serviceMock.mock.calls[1]).toEqual([2, "people"])
      );
    });

    test("calls getData with arguments 1 and 'planets' after click on Planets button", async () => {
      const serviceMock = Service.getData
        .mockResolvedValueOnce({ name: "" })
        .mockResolvedValueOnce({ name: "" });
      const user = userEvent.setup();
      render(<App />);
      const planetsButton = screen.getByText("Planets");

      await user.click(planetsButton);

      await waitFor(() => expect(Service.getData).toHaveBeenCalledTimes(2));
      await waitFor(() =>
        expect(serviceMock.mock.calls[1]).toEqual([1, "planets"])
      );
    });

    test("calls getData with arguments 2 and 'planets' after click on Planets button and Next button", async () => {
      const serviceMock = Service.getData
        .mockResolvedValueOnce({ name: "" })
        .mockResolvedValueOnce({ name: "" })
        .mockResolvedValueOnce({ name: "" });
      const user = userEvent.setup();
      render(<App />);
      const planetsButton = screen.getByText("Planets");
      const nextButton = screen.getByRole("button", { name: "Next" });

      await user.click(planetsButton);
      await user.click(nextButton);

      await waitFor(() => expect(Service.getData).toHaveBeenCalledTimes(3));
      await waitFor(() =>
        expect(serviceMock.mock.calls[1]).toEqual([1, "planets"])
      );
    });

    test("calls getData with arguments 2 and 'starships' after click on Starships button and Next button", async () => {
      const serviceMock = Service.getData
        .mockResolvedValueOnce({ name: "" })
        .mockResolvedValueOnce({ name: "" })
        .mockResolvedValueOnce({ name: "" });
      const user = userEvent.setup();
      render(<App />);
      const starshipsButton = screen.getByText("Starships");
      const nextButton = screen.getByRole("button", { name: "Next" });

      await user.click(starshipsButton);
      await user.click(nextButton);

      await waitFor(() => expect(Service.getData).toHaveBeenCalledTimes(3));
      await waitFor(() =>
        expect(serviceMock.mock.calls[2]).toEqual([2, "starships"])
      );
    });
    test("calls getData with arguments 1 and 'people' after click on Starships button and People button", async () => {
      const serviceMock = Service.getData
        .mockResolvedValueOnce({ name: "" })
        .mockResolvedValueOnce({ name: "" })
        .mockResolvedValueOnce({ name: "" });
      const user = userEvent.setup();
      render(<App />);
      const starshipsItem = screen.getByText("Starships");
      const peopleItem = screen.getByText("People");

      await user.click(starshipsItem);
      await user.click(peopleItem);

      await waitFor(() => expect(Service.getData).toHaveBeenCalledTimes(3));
      await waitFor(() =>
        expect(serviceMock.mock.calls[2]).toEqual([1, "people"])
      );
    });

    test("calls getData with arguments 1 and 'starships' after click on Starships button", async () => {
      const serviceMock = Service.getData
        .mockResolvedValueOnce({ name: "" })
        .mockResolvedValueOnce({ name: "" });
      const user = userEvent.setup();
      render(<App />);
      const starshipsButton = screen.getByText("Starships");

      await user.click(starshipsButton);

      await waitFor(() => expect(Service.getData).toHaveBeenCalledTimes(2));
      await waitFor(() =>
        expect(serviceMock.mock.calls[1]).toEqual([1, "starships"])
      );
    });

    test("renders data returned by getData", async () => {
      const testObject = {
        name: "Stanley",
        gender: "male",
        birth_year: 2000,
        eye_color: "blue",
      };
      Service.getData.mockResolvedValueOnce(testObject);
      render(<App />);
      const resultName = await screen.findByRole("heading", {
        level: 3,
        name: /Stanley/i,
      });
      const resultProps = await screen.findAllByRole("listitem");

      await waitFor(() => expect(resultName).toBeInTheDocument());
      expect(
        resultProps.find((item) => item.textContent.includes(testObject.gender))
      ).toBeTruthy();
      expect(
        resultProps.find((item) =>
          item.textContent.includes(testObject.birth_year.toString())
        )
      ).toBeTruthy();
      expect(
        resultProps.find((item) =>
          item.textContent.includes(testObject.eye_color)
        )
      ).toBeTruthy();
    });

    test("renders data returned by getData after 2 clicks on Next button", async () => {
      const testObject = {
        name: "Stanley",
        gender: "male",
        birth_year: 2000,
        eye_color: "blue",
      };
      Service.getData
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce(testObject);
      const user = userEvent.setup();
      render(<App />);
      const nextButton = screen.getByRole("button", { name: "Next" });

      await user.click(nextButton);
      await user.click(nextButton);

      const resultName = await screen.findByRole("heading", {
        level: 3,
        name: /Stanley/i,
      });
      const resultProps = await screen.findAllByRole("listitem");

      await waitFor(() => expect(resultName).toBeInTheDocument());
      expect(
        resultProps.find((item) => item.textContent.includes(testObject.gender))
      ).toBeTruthy();
      expect(
        resultProps.find((item) =>
          item.textContent.includes(testObject.birth_year.toString())
        )
      ).toBeTruthy();
      expect(
        resultProps.find((item) =>
          item.textContent.includes(testObject.eye_color)
        )
      ).toBeTruthy();
    });
  });

  describe("rendering images", () => {
    test("renders image with correct url at the start", async () => {
      Service.getData
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        });
      render(<App />);      
      const personImage = screen.getByRole("img");

      await waitFor(() =>
        expect(personImage.src).toContain("characters/1.jpg")
      );
    });
    test("renders image with correct url after click on Next button", async () => {
      Service.getData
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        });
      const user = userEvent.setup();
      render(<App />);
      const nextButton = screen.getByRole("button", { name: "Next" });
      await user.click(nextButton);
      const personImage = screen.getByRole("img");

      await waitFor(() =>
        expect(personImage.src).toContain("characters/2.jpg")
      );
    });

    test("renders image with correct url after 3 clicks on Next button", async () => {
      Service.getData
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        });
      const user = userEvent.setup();
      render(<App />);
      const nextButton = screen.getByRole("button", { name: "Next" });
      await user.click(nextButton);
      await user.click(nextButton);
      await user.click(nextButton);
      const personImage = screen.getByRole("img");

      await waitFor(() =>
        expect(personImage.src).toContain("characters/4.jpg")
      );
    });

    test("renders image with correct url after click on Planets and Next button", async () => {
      Service.getData
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        });
      const user = userEvent.setup();
      render(<App />);
      const planetsItem = screen.getByText("Planets");
      await user.click(planetsItem);
      const nextButton = screen.getByRole("button", { name: "Next" });
      await user.click(nextButton);
      const personImage = screen.getByRole("img");

      await waitFor(() =>
        expect(personImage.src).toContain("planets/2.jpg")
      );
    });

    test("renders image with correct url after click on Planets once and Next button twice", async () => {
      Service.getData
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        });
      const user = userEvent.setup();
      render(<App />);
      const planetsItem = screen.getByText("Planets");
      await user.click(planetsItem);
      const nextButton = screen.getByRole("button", { name: "Next" });
      await user.click(nextButton);
      await user.click(nextButton);
      const personImage = screen.getByRole("img");

      await waitFor(() =>
        expect(personImage.src).toContain("planets/3.jpg")
      );
    });

    test("renders image with correct url after click on Starships and Next button", async () => {
      Service.getData
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        });
      const user = userEvent.setup();
      render(<App />);
      const starshipsItem = screen.getByText("Starships");
      await user.click(starshipsItem);
      const nextButton = screen.getByRole("button", { name: "Next" });
      await user.click(nextButton);
      const personImage = screen.getByRole("img");

      await waitFor(() =>
        expect(personImage.src).toContain("starships/2.jpg")
      );
    });

    test("renders image with correct url after click on Starships once and Next button twice", async () => {
      Service.getData
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        });
      const user = userEvent.setup();
      render(<App />);
      const starshipsItem = screen.getByText("Starships");
      await user.click(starshipsItem);
      const nextButton = screen.getByRole("button", { name: "Next" });
      await user.click(nextButton);
      await user.click(nextButton);
      const personImage = screen.getByRole("img");

      await waitFor(() =>
        expect(personImage.src).toContain("starships/3.jpg")
      );
    });
    test("renders image with correct url after click on Starships, then on People", async () => {
      Service.getData
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        })
        .mockResolvedValueOnce({
          name: "",
        });
      const user = userEvent.setup();
      render(<App />);
      const starshipsItem = screen.getByText("Starships");
      const peopleItem = screen.getByText("People");
      await user.click(starshipsItem);
      await user.click(peopleItem);

      const personImage = screen.getByRole("img");

      await waitFor(() =>
        expect(personImage.src).toContain("characters/1.jpg")
      );
    });
  });
});
