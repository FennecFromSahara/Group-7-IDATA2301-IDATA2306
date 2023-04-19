import { useFetch } from "../../hooks/useFetch";
import { renderHook } from "@testing-library/react";

/**
 * Test for the useFetch hook.
 */
describe("useFetch", () => {
  it("fetches data from the given url and returns it", async () => {
    const url = "https://jsonplaceholder.typicode.com/todos/1";

    // Mock the response that will be returned by the fetch call
    const mockResponse = {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    };
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    // Call the useFetch hook and wait for it to finish executing
    const { data, error } = useFetch(url);

    // Verify that the hook returned the correct response
    expect(data).toEqual(mockResponse);
    expect(error).toBeNull();

    // Restore the fetch method to its original implementation
    window.fetch.mockRestore();
  });
});
