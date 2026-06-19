package backend;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NQueensServer {

    public static void main(String[] args) throws IOException {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/api/solve", new SolveHandler());
        server.setExecutor(null); // creates a default executor
        System.out.println("Java N-Queens Server started on port " + port);
        server.start();
    }

    static class SolveHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Handle CORS Options preflight request
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendResponse(exchange, 405, "{\"error\": \"Method not allowed\"}");
                return;
            }

            try {
                // Read request body
                InputStream is = exchange.getRequestBody();
                ByteArrayOutputStream bos = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int len;
                while ((len = is.read(buffer)) != -1) {
                    bos.write(buffer, 0, len);
                }
                String body = bos.toString(StandardCharsets.UTF_8);
                System.out.println("Received request: " + body);

                // Parse request body
                RequestData req = parseRequest(body);
                if (req == null) {
                    sendResponse(exchange, 400, "{\"error\": \"Invalid JSON payload\"}");
                    return;
                }

                // Solve N-Queens
                List<List<int[]>> solutions = solveNQueens(req.size, req.placedQueens);
                System.out.println("Found " + solutions.size() + " solutions for size " + req.size);

                // Serialize response
                String jsonResponse = serializeResponse(solutions);
                sendResponse(exchange, 200, jsonResponse);

            } catch (Exception e) {
                e.printStackTrace();
                sendResponse(exchange, 500, "{\"error\": \"Internal server error: " + e.getMessage() + "\"}");
            }
        }

        private void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
            byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(statusCode, bytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(bytes);
            os.close();
        }
    }

    static class RequestData {
        int size;
        List<int[]> placedQueens = new ArrayList<>();
    }

    private static RequestData parseRequest(String json) {
        RequestData data = new RequestData();
        // Extract size
        Pattern sizePattern = Pattern.compile("\"size\"\\s*:\\s*(\\d+)");
        Matcher sizeMatcher = sizePattern.matcher(json);
        if (sizeMatcher.find()) {
            data.size = Integer.parseInt(sizeMatcher.group(1));
        } else {
            return null; // Size is required
        }

        // Check if placedQueens is present
        Pattern queensListPattern = Pattern.compile("\"placedQueens\"\\s*:\\s*\\[(.*?)\\]", Pattern.DOTALL);
        Matcher queensListMatcher = queensListPattern.matcher(json);
        if (queensListMatcher.find()) {
            String queensContent = queensListMatcher.group(1);
            // Extract individual coordinate objects like {...}
            Pattern queenPattern = Pattern.compile("\\{([^}]+)\\}");
            Matcher queenMatcher = queenPattern.matcher(queensContent);
            while (queenMatcher.find()) {
                String objContent = queenMatcher.group(1);
                int r = -1;
                int c = -1;
                Matcher rMatcher = Pattern.compile("\"row\"\\s*:\\s*(\\d+)").matcher(objContent);
                if (rMatcher.find()) {
                    r = Integer.parseInt(rMatcher.group(1));
                }
                Matcher cMatcher = Pattern.compile("\"col\"\\s*:\\s*(\\d+)").matcher(objContent);
                if (cMatcher.find()) {
                    c = Integer.parseInt(cMatcher.group(1));
                }
                if (r != -1 && c != -1) {
                    data.placedQueens.add(new int[]{r, c});
                }
            }
        }
        return data;
    }

    private static List<List<int[]>> solveNQueens(int n, List<int[]> placedQueens) {
        List<List<int[]>> solutions = new ArrayList<>();
        int[] board = new int[n];
        for (int i = 0; i < n; i++) board[i] = -1;

        // Verify pre-placed queens are valid and map them to board
        boolean[] hasPrePlaced = new boolean[n];
        for (int[] pq : placedQueens) {
            int r = pq[0];
            int c = pq[1];
            if (r < 0 || r >= n || c < 0 || c >= n) continue; // Out of bounds
            if (board[r] != -1) {
                // Conflict: multiple queens in same row
                return solutions;
            }
            // Check conflicts with other pre-placed queens
            for (int prevR = 0; prevR < n; prevR++) {
                if (board[prevR] != -1) {
                    int prevC = board[prevR];
                    if (prevC == c || Math.abs(prevR - r) == Math.abs(prevC - c)) {
                        // Conflict: same column or diagonal
                        return solutions;
                    }
                }
            }
            board[r] = c;
            hasPrePlaced[r] = true;
        }

        backtrack(0, n, board, hasPrePlaced, solutions);
        return solutions;
    }

    private static void backtrack(int r, int n, int[] board, boolean[] hasPrePlaced, List<List<int[]>> solutions) {
        if (r == n) {
            List<int[]> sol = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                sol.add(new int[]{i, board[i]});
            }
            solutions.add(sol);
            return;
        }

        if (hasPrePlaced[r]) {
            // Check if placing this pre-placed queen conflicts with queens in previous rows
            if (isSafe(r, board[r], board)) {
                backtrack(r + 1, n, board, hasPrePlaced, solutions);
            }
            // If it conflicts, we backtrack (no other option since it's pre-placed)
            return;
        }

        for (int c = 0; c < n; c++) {
            if (isSafe(r, c, board)) {
                board[r] = c;
                backtrack(r + 1, n, board, hasPrePlaced, solutions);
                board[r] = -1;
            }
        }
    }

    private static boolean isSafe(int r, int c, int[] board) {
        for (int prevR = 0; prevR < r; prevR++) {
            int prevC = board[prevR];
            if (prevC == -1) continue;
            if (prevC == c || Math.abs(prevR - r) == Math.abs(prevC - c)) {
                return false;
            }
        }
        return true;
    }

    private static String serializeResponse(List<List<int[]>> solutions) {
        StringBuilder sb = new StringBuilder();
        sb.append("{\n  \"solutions\": [\n");
        for (int i = 0; i < solutions.size(); i++) {
            List<int[]> sol = solutions.get(i);
            sb.append("    [\n");
            for (int j = 0; j < sol.size(); j++) {
                int[] coord = sol.get(j);
                sb.append(String.format("      {\"row\": %d, \"col\": %d}", coord[0], coord[1]));
                if (j < sol.size() - 1) {
                    sb.append(",\n");
                } else {
                    sb.append("\n");
                }
            }
            sb.append("    ]");
            if (i < solutions.size() - 1) {
                sb.append(",\n");
            } else {
                sb.append("\n");
            }
        }
        sb.append("  ]\n}");
        return sb.toString();
    }
}
