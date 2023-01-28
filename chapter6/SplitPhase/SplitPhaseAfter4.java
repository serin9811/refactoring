package SplitPhase;

import java.io.IOException;

public class SplitPhaseAfter4 {
    public static void main(String[] args) {
        try {
            System.out.println(run(args));
        } catch (Exception e) {
            System.err.println(e);
            System.exit(1);
        }
    }

    static long run(String[] args) throws IOException {
        return countOrders(parseCommandLine(args));
    }

    // 오로지 명령줄 관련 작업만 처리
    private static CommandLine parseCommandLine(String[] args) {
        if(args.length == 0) throw new RuntimeException("파일명을 입력하세요");
        CommandLine result = new CommandLine();
        result.filename = args[args.length -1];
        result.onlyCountReady = Stream.of(args).anyMatch(arg -> "-r".equals(arg));

        return result;
    }

    // 실제로 처리할 작업만 수행한다
    private static long countOrders(CommandLine commandLine) throws IOException {
        File input = Paths.get(filename).toFile();
        ObjectMapper mapper = new ObjectMapper();
        Order[] orders = mapper.readValue(input, Order[].class);


        if(commandLine.onlyCountReady)
            return Stream.of(orders).filter(o -> "ready".equals(o.status)).count();
        else 
            return orders.length;
    }
}

private static class CommandLine {
    boolean onlyCountReady
    String filename;
}