package trafficware_java;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

/**
 * This class is reading from a file, and then prints only the cellid and lac
 * of the measurement that has lac = 231
 */
public class PlainJavaApp {

	// pattern to split later on commas
	private static final Pattern COMMA = Pattern.compile(",");

	/**
	 * This method reads the file, stores it into a list, and then
	 * returns it
	 * @param filename, the name of the file
	 * @return the list that contains the file's context
	 */
	private List<String> readFile(String filename) {

		List<String> records = new ArrayList<String>();

		try {

			BufferedReader reader = new BufferedReader(new FileReader(filename));
			String line;

			while ((line = reader.readLine()) != null) {
				records.add(line);
			}

			reader.close();
			return records;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

        /**
	 * This method filters the list, prints only the distinct cellid and lac
         * with lac = 231
	 * @param records, the file's records
         */
	private void filterLacCellids(List<String> records) {

		Set<String> results = new LinkedHashSet<String>();

		records.forEach(x -> {
			List<String> elements = Arrays.asList(COMMA.split(x));
			if (elements.get(7).compareTo("231") == 0)
				results.add(elements.get(5) + "," + elements.get(7));
		});

		results.forEach(x -> {
			System.out.println(x.toString());
		});

	}

	public static void main(String args[]) {

		PlainJavaApp consumer = new PlainJavaApp();
		List<String> myMeasurements = consumer.readFile("filepath");
		consumer.filterLacCellids(myMeasurements);
	}

}
