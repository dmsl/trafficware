package cs.ucy.ac.cy.trafficware;

import org.apache.spark.api.java.JavaSparkContext;

import scala.Tuple2;

import org.apache.spark.api.java.JavaRDD;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.function.Function;

/**
 * This class is reading from a file, and then prints only the cellid and lac
 * of the measurement that has lac = 231 using spark
 */
public class App {

	// pattern to split later on commas
	private static final Pattern COMMA = Pattern.compile(",");

	public static void main(String[] args) {

		// create spark app
		SparkConf conf = new SparkConf().setAppName("TrafficWare");
		JavaSparkContext sc = new JavaSparkContext(conf);

		// read file
		JavaRDD<String> distFile = sc.textFile("filepath");

		// for each line do the following
		distFile.mapToPair(x -> {
			Integer lac = 0;
			Integer cellid = 0;

			// separates elements with comma
			List<String> elements = Arrays.asList(COMMA.split(x));

			// stores lac and cellid
			try {

			lac = Integer.parseInt(elements.get(7));
			cellid = Integer.parseInt(elements.get(5));

			} catch(NumberFormatException e) {
				
				return new Tuple2<Integer, Integer>(0, 0);
				 	
			}

			// converts cellid and lac into a tuple
			return new Tuple2<Integer, Integer>(lac, cellid);

		// now for each tuple, check if lac = 231, distinct elements, and print them
		}).filter(x -> x._1() == 231).distinct().foreach(word -> {

			System.out.println(word.toString());

		});

		sc.close();
	}
}
